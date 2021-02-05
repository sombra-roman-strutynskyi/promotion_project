import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared';
import { COMPONENTS } from './components';
import { CONTAINERS } from './containers';
import { ProfileRoutingModule } from './profile-routing.module';
import { SERVICES } from './services';
import { reducer, PROFILE_FEATURE_KEY } from './state';
import { ProfileEffects } from './state/profile.effects';

@NgModule({
  declarations: [...COMPONENTS, ...CONTAINERS],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    CoreModule,
    StoreModule.forFeature(PROFILE_FEATURE_KEY, reducer),
    EffectsModule.forFeature([ProfileEffects]),
  ],
  providers: [...SERVICES],
})
export class ProfileModule {}
