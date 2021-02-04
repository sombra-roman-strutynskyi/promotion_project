import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { getUrlToFileFromFirebaseStorage$, omit } from '@shared';
import { of } from 'rxjs';
import { Observable, from } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { IArticle } from '../models';
import { Article } from '../models/articles';
@Injectable()
export class ArticlesDBService {
  constructor(
    private dbFirebase: AngularFireDatabase,
    private storageFirebase: AngularFireStorage
  ) {}

  getArticle(id: string): Observable<IArticle> {
    return this.dbFirebase
      .object(`articles/${id}`)
      .valueChanges()
      .pipe(
        take(1),
        map((data: IArticle) => new Article(data))
      );
  }

  createArticle(article: IArticle): Observable<IArticle> {
    const id = uuid();
    return this.getArticleImageUrl(article, id).pipe(
      switchMap((imageUrl) => {
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
            'image'
          ) as IArticle
        );

        return from(
          this.dbFirebase.object(`articles/${newArticle.id}`).set(newArticle)
        ).pipe(map(() => newArticle));
      })
    );
  }

  updateArticle(article: IArticle): Observable<IArticle> {
    return this.getArticleImageUrl(article).pipe(
      switchMap((imageUrl) => {
        const updateArticle = omit(
          {
            ...article,
            updatedAt: new Date().toISOString(),
            imageUrl,
          },
          'image'
        ) as IArticle;
        return from(
          this.dbFirebase.object(`articles/${article.id}`).update(updateArticle)
        ).pipe(map(() => updateArticle));
      })
    );
  }

  removeArticle(id): Observable<string> {
    return from(this.dbFirebase.object(`articles/${id}`).remove()).pipe(
      map(() => id)
    );
  }

  getArticles(): Observable<IArticle[]> {
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

  uploadArticlesFile(id: string, file: File): Observable<string> {
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
      : of(article?.imageUrl || '');
  }
}
