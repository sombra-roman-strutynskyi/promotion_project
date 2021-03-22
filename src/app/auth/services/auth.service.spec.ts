import { TestBed, inject } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '@env';
import {
  AuthCredential,
  AuthProvider,
  UserCredential,
  UserFirebase,
} from '@shared';
import {
  MOCK_CREDENTIALS,
  MOCK_FIREBASE_USER,
  MOCK_FIREBASE_USER_CREDENTIALS,
  MOCK_REGISTER_USER,
  MOCK_USER,
} from '@testing';
import { of } from 'rxjs';
import { Providers, User } from '../models';
import { AuthService } from './auth.service';

const providers = [
  AuthService,
  {
    provide: AngularFireAuth,
    useValue: {
      authState: of(MOCK_FIREBASE_USER),
    },
  },
  {
    provide: AngularFireDatabase,
    useValue: {
      object: jest.fn(() => ({
        set: jest.fn(),
        valueChanges: jest.fn(() => of(MOCK_USER)),
      })),
    },
  },
  {
    provide: MatDialog,
    useValue: {},
  },
];
describe('Service: Auth', () => {
  let service: AuthService;
  let authFirebase: AngularFireAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers,
    });
    service = TestBed.inject(AuthService);
    authFirebase = TestBed.inject(AngularFireAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return `userCredential` when login with Facebook', (done) => {
    const userCredential: Partial<UserCredential> = {
      ...MOCK_FIREBASE_USER_CREDENTIALS,
      additionalUserInfo: {
        providerId: 'facebook.com',
        isNewUser: true,
        profile: {
          first_name: 'firstName',
          last_name: 'lastName',
          email: 'test@email.com',
        },
      },
    };

    authFirebase['signInWithPopup'] = jest.fn(() =>
      Promise.resolve(userCredential as UserCredential)
    );
    service.facebookLogin().subscribe((data) => {
      expect(data).toEqual(userCredential);
      done();
    });
  });
  it('should return `userCredential` when login with Google', (done) => {
    const userCredential: Partial<UserCredential> = {
      ...MOCK_FIREBASE_USER_CREDENTIALS,
      additionalUserInfo: {
        providerId: 'google.com',
        isNewUser: true,
        profile: {
          given_name: 'firstName',
          family_name: 'lastName',
          email: 'test@email.com',
        },
      },
    };

    authFirebase['signInWithPopup'] = jest.fn(() =>
      Promise.resolve(userCredential as UserCredential)
    );
    service.googleLogin().subscribe((data) => {
      expect(data).toEqual(userCredential);
      done();
    });
  });
  it('should return `userCredential` and remember in local when login with Credentials', (done) => {
    authFirebase['setPersistence'] = jest.fn(() => Promise.resolve());

    authFirebase['signInWithEmailAndPassword'] = jest.fn(() =>
      Promise.resolve(MOCK_FIREBASE_USER_CREDENTIALS as UserCredential)
    );
    service.loginWithCredentials(MOCK_CREDENTIALS).subscribe((data) => {
      expect(data).toEqual(MOCK_FIREBASE_USER_CREDENTIALS);
      done();
    });
  });
  it('should return `userCredential` and remember in session when login with Credentials', (done) => {
    authFirebase['setPersistence'] = jest.fn(() => Promise.resolve());

    authFirebase['signInWithEmailAndPassword'] = jest.fn(() =>
      Promise.resolve(MOCK_FIREBASE_USER_CREDENTIALS as UserCredential)
    );
    service
      .loginWithCredentials({ ...MOCK_CREDENTIALS, remember: false })
      .subscribe((data) => {
        expect(data).toEqual(MOCK_FIREBASE_USER_CREDENTIALS);
        done();
      });
  });
  it('should logout', () => {
    authFirebase['signOut'] = jest.fn(() => Promise.resolve());
    const spy = jest.spyOn(authFirebase, 'signOut');

    service.logout();
    expect(spy).toHaveBeenCalled();
  });
  it('should return `currentUser` and `providers` when call `getCurrentUser` method ', (done) => {
    service.getCurrentUser().subscribe((data) => {
      expect(data).toEqual({
        currentUser: new User(MOCK_USER),
        providers: { facebook: true },
      });
      done();
    });
  });

  it('should return `userCredential` when register user', (done) => {
    const userCredential = {
      user: {
        ...MOCK_FIREBASE_USER,
        sendEmailVerification: jest.fn(),
      } as UserFirebase,
    } as UserCredential;
    authFirebase['createUserWithEmailAndPassword'] = jest.fn(() =>
      Promise.resolve(userCredential)
    );
    service.register(MOCK_REGISTER_USER).subscribe((data) => {
      expect(data).toEqual(userCredential);
      done();
    });
  });
  it('should send password reset email', () => {
    authFirebase['sendPasswordResetEmail'] = jest.fn(() => Promise.resolve());
    const { email } = MOCK_USER;
    const spy = jest.spyOn(authFirebase, 'sendPasswordResetEmail');

    service.passwordForgotten(email);
    expect(spy).toHaveBeenCalledWith(email, {
      url: `${environment.url}auth`,
    });
  });
  it('should return `userCredential` when password reset and login', (done) => {
    service['loginWithCredentials'] = jest.fn(() =>
      of(MOCK_FIREBASE_USER_CREDENTIALS as UserCredential)
    );
    authFirebase['confirmPasswordReset'] = jest.fn(() => Promise.resolve());

    service
      .resetPassword('actionCode', 'password', MOCK_USER.email)
      .subscribe((data) => {
        expect(data).toEqual(MOCK_FIREBASE_USER_CREDENTIALS);
        done();
      });
  });
  it('should return `email` when verify password reset code', (done) => {
    authFirebase['verifyPasswordResetCode'] = jest.fn(() =>
      Promise.resolve(MOCK_USER.email)
    );
    service.verifyPasswordResetCode('actionCode').subscribe((data) => {
      expect(data).toEqual(MOCK_USER.email);
      done();
    });
  });

  it('should verify email address', () => {
    authFirebase['applyActionCode'] = jest.fn();
    const spy = jest.spyOn(authFirebase, 'sendPasswordResetEmail');

    service.verifyEmailAddress('actionCode');
    expect(spy).toHaveBeenCalled();
  });
  it('should merge accounts with `password`', (done) => {
    const userCredential = {
      user: {
        ...MOCK_FIREBASE_USER,
        linkWithCredential: jest.fn(() => Promise.resolve(userCredential)),
      } as UserFirebase,
    } as UserCredential;

    authFirebase['fetchSignInMethodsForEmail'] = jest.fn(() =>
      Promise.resolve([Providers.PASSWORD])
    );
    service['getPasswordFromDialog'] = jest.fn(() => of('password'));
    service['loginWithCredentials'] = jest.fn(() => of(userCredential));

    service
      .mergeAccounts(MOCK_USER.email, {} as AuthCredential)
      .subscribe((data) => {
        expect(data).toEqual(userCredential);
        done();
      });
  });
  it('should merge accounts with `google.com`', (done) => {
    const userCredential = {
      user: {
        ...MOCK_FIREBASE_USER,
        linkWithCredential: jest.fn(() => Promise.resolve(userCredential)),
      } as UserFirebase,
    } as UserCredential;

    authFirebase['fetchSignInMethodsForEmail'] = jest.fn(() =>
      Promise.resolve([Providers.GOOGLE])
    );
    authFirebase['signInWithPopup'] = jest.fn(() =>
      Promise.resolve(userCredential)
    );
    service['getProviderForProviderId'] = jest.fn(() => ({} as AuthProvider));

    service
      .mergeAccounts(MOCK_USER.email, {} as AuthCredential)
      .subscribe((data) => {
        expect(data).toEqual(userCredential);
        done();
      });
  });
  it('should merge accounts with `facebook.com`', (done) => {
    const userCredential = {
      user: {
        ...MOCK_FIREBASE_USER,
        linkWithCredential: jest.fn(() => Promise.resolve(userCredential)),
      } as UserFirebase,
    } as UserCredential;

    authFirebase['fetchSignInMethodsForEmail'] = jest.fn(() =>
      Promise.resolve([Providers.FACEBOOK])
    );
    authFirebase['signInWithPopup'] = jest.fn(() =>
      Promise.resolve(userCredential)
    );
    service['getProviderForProviderId'] = jest.fn(() => ({} as AuthProvider));

    service
      .mergeAccounts(MOCK_USER.email, {} as AuthCredential)
      .subscribe((data) => {
        expect(data).toEqual(userCredential);
        done();
      });
  });
  it('should merge accounts without provider', (done) => {
    const userCredential = {
      user: {
        ...MOCK_FIREBASE_USER,
        linkWithCredential: jest.fn(() => Promise.resolve(userCredential)),
      } as UserFirebase,
    } as UserCredential;

    authFirebase['fetchSignInMethodsForEmail'] = jest.fn(() =>
      Promise.resolve([])
    );
    service['getProviderForProviderId'] = jest.fn(() => null);

    service
      .mergeAccounts(MOCK_USER.email, {} as AuthCredential)
      .subscribe((data) => {
        expect(data).toEqual(null);
        done();
      });
  });
});
