import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { AuthFacade } from '@auth';
import { AuthFacadeMock, MOCK_ARTICLE } from '@testing';
import { omit } from 'lodash';
import { from, of } from 'rxjs';
import { Article } from '../models';
import { ArticlesDbService } from './articles-db.service';
const providers = [
  ArticlesDbService,
  {
    provide: AuthFacade,
    useClass: AuthFacadeMock,
  },
  {
    provide: AngularFireAuth,
    useValue: {
      user: of({
        email: 'test@email.com',
        reauthenticateWithCredential: jest.fn(() => of(null)),
        updatePassword: jest.fn(() => from(Promise.resolve())),
      }),
    },
  },
  {
    provide: AngularFireDatabase,
    useValue: {
      object: jest.fn(() => ({
        set: jest.fn(() => Promise.resolve()),
        update: jest.fn(() => Promise.resolve()),
        valueChanges: jest.fn(() => of(MOCK_ARTICLE)),
        remove: jest.fn(() => Promise.resolve()),
      })),
      list: jest.fn(() => ({
        valueChanges: jest.fn(() => of([MOCK_ARTICLE])),
      })),
    },
  },
  {
    provide: AngularFireStorage,
    useValue: {
      upload: jest.fn(() =>
        Promise.resolve()
      ) as Partial<AngularFireUploadTask>,
      ref: jest.fn(() => ({ getDownloadURL: jest.fn(() => of(null)) })),
    },
  },
  {
    provide: MatDialog,
    useValue: {},
  },
];
describe('Service: ArticlesDb', () => {
  let service: ArticlesDbService;
  let authFirebase: AngularFireAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers,
    });
    service = TestBed.inject(ArticlesDbService);
    authFirebase = TestBed.inject(AngularFireAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return Article when call getArticle', (done) => {
    service.getArticle('id').subscribe((data) => {
      expect(data).toEqual(new Article(MOCK_ARTICLE));
      done();
    });
  });
  it('should return list of Article when call getArticles', (done) => {
    service.getArticles().subscribe((data) => {
      expect(data).toEqual([new Article(MOCK_ARTICLE)]);
      done();
    });
  });
  it('should return Article when call createArticle', (done) => {
    service.createArticle(MOCK_ARTICLE).subscribe((data) => {
      expect(omit(data, ['id', 'createdAt', 'updatedAt'])).toEqual({
        authorId: '1',
        body: 'body',
        image: null,
        imageUrl: '',
        title: 'title',
      });
      done();
    });
  });
  it('should return Article when call updateArticle', (done) => {
    service.updateArticle(MOCK_ARTICLE).subscribe((data) => {
      expect(omit(data, ['updatedAt'])).toEqual({
        authorId: '1',
        body: 'body',

        createdAt: '2021-03-09T20:28:21.523Z',
        id: '1',
        imageUrl: null,
        title: 'title',
      });
      done();
    });
  });
  it('should return id when call removeArticle with id', (done) => {
    service.removeArticle('id').subscribe((data) => {
      expect(data).toEqual('id');
      done();
    });
  });
});
