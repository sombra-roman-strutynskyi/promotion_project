import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CoreModule } from '@core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared';
import { AuthRoutingModule } from './auth-routing.module';
import { COMPONENTS } from './components';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import {
  AuthService,
  AuthGuard,
  UnauthorizedGuard,
  AuthFacade,
} from './services';
import { AuthEffects } from './state/auth.effects';
import { AUTH_FEATURE_KEY, reducer } from './state/auth.reducer';
import { environment } from '@env';
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    CoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    StoreModule.forFeature(AUTH_FEATURE_KEY, reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [
    AuthService,
    AuthFacade,
    AuthGuard,
    UnauthorizedGuard,
    { provide: BUCKET, useValue: environment.firebase.storageBucket },
  ],
})
export class AuthModule {}
