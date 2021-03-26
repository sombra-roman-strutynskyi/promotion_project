import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { SnackbarService } from '@shared';
import { of } from 'rxjs';
import { WidgetsEffects } from '../state/widgets.effects';
import {
  WidgetsState,
  initialState,
  reducer,
  WIDGETS_FEATURE_KEY,
} from '../state/widgets.reducer';
import { WidgetsApiService } from './widgets-api.service';
import { WidgetsFacade } from './widgets.facade';

interface TestSchema {
  widgets: WidgetsFacade;
}

describe('WidgetsFacade', () => {
  let facade: WidgetsFacade;
  let store: Store<TestSchema>;
  let mockInitialState: WidgetsState;
  describe('used in NgModule', () => {
    beforeEach(() => {
      mockInitialState = {
        ...initialState,
      };

      @NgModule({
        imports: [
          StoreModule.forFeature(WIDGETS_FEATURE_KEY, reducer, {
            initialState: mockInitialState,
          }),
          EffectsModule.forFeature([WidgetsEffects]),
        ],
        providers: [
          WidgetsFacade,
          {
            provide: WidgetsApiService,
            useValue: {
              getExchangeRates: jest.fn(() => of(null)),
              getCryptoCurrencyTypes: jest.fn(() => of(null)),
            },
          },
          {
            provide: SnackbarService,
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
      facade = TestBed.inject(WidgetsFacade);
    });

    it('should return pending$ value', (done) => {
      facade.pending$.subscribe((pending) => {
        expect(pending).toEqual(mockInitialState.pending);
        done();
      });
    });

    it('should return error$ value', (done) => {
      facade.error$.subscribe((error) => {
        expect(error).toEqual(null);
        done();
      });
    });
    it('should return currencyTypes$ value', (done) => {
      facade.currencyTypes$.subscribe((currencyTypes) => {
        expect(currencyTypes).toEqual(null);
        done();
      });
    });
    it('should return cryptoCurrencyTypes$ value', (done) => {
      facade.cryptoCurrencyTypes$.subscribe((cryptoCurrencyTypes) => {
        expect(cryptoCurrencyTypes).toEqual(null);
        done();
      });
    });
  });
});
