import { inject, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterMock } from '@testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: Router,
          useClass: RouterMock,
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
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', inject([AuthGuard], () => {
    expect(guard).toBeTruthy();
  }));

  it('should return false for child routes if the user is not logged in', () => {
    const expected = cold('(a|)', { a: false });
    const response = cold('(b|)', { b: false });
    guard['checkAuthed'] = jest.fn(() => response);
    expect(guard.canActivateChild()).toBeObservable(expected);
  });

  it('should return true for child routes if the user is logged in', () => {
    const expected = cold('(a|)', { a: true });
    const response = cold('(b|)', { b: true });
    guard['checkAuthed'] = jest.fn(() => response);
    expect(guard.canActivateChild()).toBeObservable(expected);
  });

  it('should return true if the user is logged in', () => {
    const expected = cold('a|', { a: true });
    const response = cold('b|', { b: true });
    guard['checkAuthed'] = jest.fn(() => response);
    expect(guard.canActivate()).toBeObservable(expected);
  });

  it('should return false if the user is not logged in', () => {
    const expected = cold('a|', { a: false });
    const response = cold('b|', { b: false });
    guard['checkAuthed'] = jest.fn(() => response);
    expect(guard.canActivate()).toBeObservable(expected);
  });
});
