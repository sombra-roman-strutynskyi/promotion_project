import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '@shared';
import {
  AuthServiceMock,
  MOCK_USER,
  MOCK_PROVIDERS,
  MOCK_CREDENTIALS,
  MOCK_REGISTER_USER,
} from '@testing';
import { IRegisterUser, ICredentials } from '../models';
import * as AuthActions from '../state/auth.actions';
import { AuthEffects } from '../state/auth.effects';
import {
  AuthState,
  AUTH_FEATURE_KEY,
  initialState,
  reducer,
} from '../state/auth.reducer';
import { AuthFacade } from './auth.facade';
import { AuthService } from './auth.service';

interface TestSchema {
  auth: AuthState;
}

describe('AuthFacade', () => {
  let facade: AuthFacade;
  let store: Store<TestSchema>;
  let mockInitialState: AuthState;
  let dispatchSpy;
  describe('used in NgModule', () => {
    beforeEach(() => {
      mockInitialState = {
        ...initialState,
        pending: false,
        user: MOCK_USER,
        userLoaded: true,
        providers: {
          ...MOCK_PROVIDERS,
        },
      };

      @NgModule({
        imports: [
          RouterTestingModule,
          StoreModule.forFeature(AUTH_FEATURE_KEY, reducer, {
            initialState: mockInitialState,
          }),
          EffectsModule.forFeature([AuthEffects]),
        ],
        providers: [
          AuthFacade,
          {
            provide: AuthService,
            useClass: AuthServiceMock,
          },
          {
            provide: SnackbarService,
            useValue: {},
          },
          {
            provide: MatDialog,
            useValue: {},
          },
        ],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot(
            {},
            {
              runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
                strictStateSerializability: true,
                strictActionSerializability: true,
              },
            }
          ),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(AuthFacade);
      dispatchSpy = spyOn(store, 'dispatch');
    });

    it('should return pending$ value', (done) => {
      facade.pending$.subscribe((pending) => {
        expect(pending).toEqual(mockInitialState.pending);
        done();
      });
    });

    it('should return currentUser$ value', (done) => {
      facade.currentUser$.subscribe((user) => {
        expect(user).toEqual({
          ...MOCK_USER,
        });
        done();
      });
    });

    it('should return providers$ value', (done) => {
      facade.providers$.subscribe((providers) => {
        expect(providers).toEqual(mockInitialState.providers);
        done();
      });
    });
    it('should return error$ value', (done) => {
      facade.error$.subscribe((error) => {
        expect(error).toEqual(mockInitialState.error);
        done();
      });
    });
    it('should dispatch loginWithCredentials action', () => {
      const credentials: ICredentials = MOCK_CREDENTIALS;
      const expectedAction = AuthActions.loginWithCredentials({ credentials });

      facade.loginWithCredentials(credentials);

      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });

    it('should dispatch loginWithGoogle action', () => {
      const expectedAction = AuthActions.loginWithGoogle();

      facade.loginWithGoogle();

      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });

    it('should dispatch loginWithFacebook action', () => {
      const expectedAction = AuthActions.loginWithFacebook();

      facade.loginWithFacebook();

      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });

    it('should dispatch logout action', () => {
      const expectedAction = AuthActions.logout();

      facade.logout();

      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });

    it('should dispatch logoutSuccess action', () => {
      const expectedAction = AuthActions.logoutSuccess();

      facade.logoutSuccess();

      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });
    it('should dispatch forgotPassword action', () => {
      const email = 'test@email.com';
      const expectedAction = AuthActions.forgotPassword({ email });

      facade.forgotPassword(email);

      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });
    it('should dispatch register action', () => {
      const user: IRegisterUser = MOCK_REGISTER_USER;
      const expectedAction = AuthActions.register({ user });

      facade.register(user);

      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });
    it('should dispatch loadUserProfile action', () => {
      const expectedAction = AuthActions.loadUserProfile();

      facade.loadProfile();

      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });
    it('should dispatch resetPassword action', () => {
      const actionCode = 'actionCode';
      const newPassword = 'password';
      const email = 'test@email.com';
      const expectedAction = AuthActions.resetPassword({
        actionCode,
        newPassword,
        email,
      });

      facade.resetPassword(actionCode, newPassword, email);

      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });
  });
});
