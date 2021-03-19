import { inject, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { RouterMock } from '@testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { UnauthorizedGuard } from './unautorized.guard';

describe('UnauthorizedGuard', () => {
  let guard: UnauthorizedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnauthorizedGuard,
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
      ],
    });
    guard = TestBed.inject(UnauthorizedGuard);
  });

  it('should be created', inject([UnauthorizedGuard], () => {
    expect(guard).toBeTruthy();
  }));

  it('should return false if the user is logged in ', () => {
    const expected = cold('(a|)', { a: false });
    const response = cold('(b|)', { b: true });
    guard['checkAuthed'] = jest.fn(() => response);
    expect(guard.canActivate()).toBeObservable(expected);
  });

  it('should return true if the user is not logged in', () => {
    const expected = cold('(a|)', { a: true });
    const response = cold('(b|)', { b: false });
    guard['checkAuthed'] = jest.fn(() => response);
    expect(guard.canActivate()).toBeObservable(expected);
  });
});
