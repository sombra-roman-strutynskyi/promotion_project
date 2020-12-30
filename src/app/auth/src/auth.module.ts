import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { AuthRoutingModule } from './auth-routing.module';
import { COMPONENTS } from './components';
@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, AuthRoutingModule, SharedModule, CoreModule,
    AngularFireAuthModule],
})
export class AuthModule {}
