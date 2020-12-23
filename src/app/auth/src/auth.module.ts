import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';
import {AuthComponent} from './components';

@NgModule({
  imports: [CommonModule],
  declarations: [SharedModule, AuthComponent],
})
export class AuthModule {
}
