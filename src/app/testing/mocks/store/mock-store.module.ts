import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {
  ActionReducerMap,
  MetaReducer,
  StoreModule,
  ReducerManager,
} from '@ngrx/store';
import { MockEffect } from './mock.effect';
import { createMockReducer } from './mock.reducer';

const reducers: ActionReducerMap<unknown> = {};

const metaReducers: MetaReducer<unknown>[] = [];

export function initReducer(featureName: string, initialState: unknown) {
  return (reducer: ReducerManager) => {
    return () =>
      new Promise((resolve, reject) => {
        reducer.addReducer(featureName, createMockReducer(initialState));
        resolve('mocked reducer');
      });
  };
}
/**
 * @description https://stackblitz.com/edit/test-ngrx-store
 */
@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot([MockEffect]),
  ],
  exports: [StoreModule],
})
export class MockStoreModule {
  static forRoot(
    featureName: string,
    initialState: unknown
  ): ModuleWithProviders<MockStoreModule> {
    return {
      ngModule: MockStoreModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: initReducer(featureName, initialState),
          deps: [ReducerManager],
          multi: true,
        },
      ],
    };
  }
}
