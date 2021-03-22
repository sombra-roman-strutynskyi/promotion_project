import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { getUrlToFileFromFirebaseStorage$ } from '@shared';
import { omit } from 'lodash';
import { of } from 'rxjs';
import { Observable, from } from 'rxjs';
import { map, take, mergeMap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { IArticle, Article } from '../models';
@Injectable()
export class ArticlesDbService {
  constructor(
    private dbFirebase: AngularFireDatabase,
    private storageFirebase: AngularFireStorage
  ) {}

  public getArticle(id: string): Observable<IArticle> {
    return this.dbFirebase
      .object(`articles/${id}`)
      .valueChanges()
      .pipe(
        take(1),
        map((data: IArticle) => new Article(data))
      );
  }

  public getArticles(): Observable<IArticle[]> {
    return this.dbFirebase
      .list(`articles`)
      .valueChanges()
      .pipe(
        take(1),
        map((articles: IArticle[]) =>
          articles.map((article: IArticle) => new Article(article))
        )
      );
  }

  public createArticle(article: IArticle): Observable<IArticle> {
    const id = uuid();
    return this.getArticleImageUrl(article, id).pipe(
      mergeMap((imageUrl) => {
        const dateNow = new Date().toISOString();
        const newArticle = new Article(
          omit(
            {
              ...article,
              id,
              imageUrl,
              createdAt: dateNow,
              updatedAt: dateNow,
            },
            ['image']
          ) as IArticle
        );

        return from(
          this.dbFirebase.object(`articles/${newArticle.id}`).set(newArticle)
        ).pipe(map(() => newArticle));
      })
    );
  }

  public updateArticle(article: IArticle): Observable<IArticle> {
    return this.getArticleImageUrl(article).pipe(
      mergeMap((imageUrl) => {
        const updateArticle = omit(
          {
            ...article,
            updatedAt: new Date().toISOString(),
            imageUrl,
          },
          ['image']
        ) as IArticle;
        return from(
          this.dbFirebase.object(`articles/${article.id}`).update(updateArticle)
        ).pipe(map(() => updateArticle));
      })
    );
  }

  public removeArticle(id: string): Observable<string> {
    return from(this.dbFirebase.object(`articles/${id}`).remove()).pipe(
      map(() => id)
    );
  }

  private uploadArticlesFile(id: string, file: File): Observable<string> {
    const filePath = `articlesImage/${id}`;
    return getUrlToFileFromFirebaseStorage$(
      this.storageFirebase.upload(filePath, file),
      filePath,
      this.storageFirebase
    ).pipe(take(1));
  }

  private getArticleImageUrl(
    article: IArticle,
    id: string = null
  ): Observable<string> {
    return article.image
      ? this.uploadArticlesFile(id || article.id, article.image[0])
      : of(article?.imageUrl ?? '');
  }
}
