import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared';
import { COMPONENTS } from './components';
import { SERVICES } from './services';
import { reducer, WIDGETS_FEATURE_KEY } from './state';
import { WidgetsEffects } from './state/widgets.effects';

@NgModule({
  declarations: [...COMPONENTS],
  exports: [COMPONENTS],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(WIDGETS_FEATURE_KEY, reducer),
    EffectsModule.forFeature([WidgetsEffects]),
  ],
  providers: [...SERVICES],
})
export class WidgetsModule {}
