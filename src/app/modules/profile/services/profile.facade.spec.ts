import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { AuthFacade } from '@auth';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { SnackbarService } from '@shared';
import { MOCK_CHANGE_PASSWORD, AuthFacadeMock } from '@testing';
import { MOCK_FIREBASE_ERROR, MOCK_UPDATED_PROFILE } from '@testing';
import * as ProfileActions from '../state/profile.actions';
import { ProfileEffects } from '../state/profile.effects';
import {
  ProfileState,
  initialState,
  reducer,
  PROFILE_FEATURE_KEY,
} from '../state/profile.reducer';
import { ProfileDbService } from './profile-db.service';
import { ProfileFacade } from './profile.facade';

interface TestSchema {
  profile: ProfileFacade;
}

describe('ProfileFacade', () => {
  let facade: ProfileFacade;
  let store: Store<TestSchema>;
  let mockInitialState: ProfileState;
  let dispatchSpy;
  describe('used in NgModule', () => {
    beforeEach(() => {
      mockInitialState = {
        ...initialState,
        error: MOCK_FIREBASE_ERROR.message,
      };

      @NgModule({
        imports: [
          StoreModule.forFeature(PROFILE_FEATURE_KEY, reducer, {
            initialState: mockInitialState,
          }),
          EffectsModule.forFeature([ProfileEffects]),
        ],
        providers: [
          ProfileFacade,
          {
            provide: ProfileDbService,
            useValue: {},
          },
          {
            provide: AuthFacade,
            useClass: AuthFacadeMock,
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
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}

      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(ProfileFacade);

      dispatchSpy = spyOn(store, 'dispatch');
    });

    it('should return pending$ value', (done) => {
      facade.pending$.subscribe((pending) => {
        expect(pending).toEqual(mockInitialState.pending);
        done();
      });
    });

    it('should return error$ value', (done) => {
      facade.error$.subscribe((error) => {
        expect(error).toEqual(mockInitialState.error);
        done();
      });
    });
    it('should dispatch changePassword action', () => {
      const expectedAction = ProfileActions.changePassword({
        oldPassword: MOCK_CHANGE_PASSWORD.oldPassword,
        newPassword: MOCK_CHANGE_PASSWORD.newPassword,
      });

      facade.changePassword(MOCK_CHANGE_PASSWORD);

      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });
    it('should dispatch updateUserProfile action', () => {
      const expectedAction = ProfileActions.updateUserProfile({
        profile: MOCK_UPDATED_PROFILE,
      });

      facade.updateProfile(MOCK_UPDATED_PROFILE);

      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });
  });
});
