import { inject, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { AuthFacade } from '@auth';
import { provideMockStore } from '@ngrx/store/testing';
import { ArticlesFacadeMock, AuthFacadeMock, RouterMock } from '@testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { ArticleEditGuard } from './article-edit.guard';
import { ArticlesFacade } from './articles.facade';

describe('ArticleEditGuard', () => {
  let guard: ArticleEditGuard;
  let facade: ArticlesFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ArticleEditGuard,
        {
          provide: Router,
          useClass: RouterMock,
        },
        {
          provide: AuthFacade,
          useClass: AuthFacadeMock,
        },
        {
          provide: ArticlesFacade,
          useClass: ArticlesFacadeMock,
        },
        {
          provide: AngularFireAuth,
          useValue: {
            authState: of(true),
          },
        },
        provideMockStore(),
      ],
    });
    guard = TestBed.inject(ArticleEditGuard);
    facade = TestBed.inject(ArticlesFacade);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if the user is current user', () => {
    const mockActivatedRouteSnapshot = {
      params: {
        id: 'id',
      } as Params,
    } as ActivatedRouteSnapshot;

    const expected = cold('a|', { a: true });
    const response = cold('b|', { b: true });
    const responseIsCurrent = cold('c|', { c: true });
    guard['getArticleAuthor'] = jest.fn(() => response);
    guard['isCurrentUserId'] = jest.fn(() => responseIsCurrent);
    expect(guard.canActivate(mockActivatedRouteSnapshot)).toBeObservable(
      expected
    );
  });

  it('should return false if the user is not current user', () => {
    const mockActivatedRouteSnapshot = {
      params: {
        id: 'id',
      } as Params,
    } as ActivatedRouteSnapshot;

    const expected = cold('a|', { a: false });
    const response = cold('b|', { b: false });
    const responseIsCurrent = cold('c|', { c: false });
    guard['getArticleAuthor'] = jest.fn(() => response);
    guard['isCurrentUserId'] = jest.fn(() => responseIsCurrent);
    expect(guard.canActivate(mockActivatedRouteSnapshot)).toBeObservable(
      expected
    );
  });
});
