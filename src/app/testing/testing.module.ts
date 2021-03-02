import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SpyLocation } from '@angular/common/testing';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { UiFormlyService, SharedModule } from '@shared';
import { FormlyServiceMock, RouterMock } from './mocks';
import { RouterLinkDirectiveStub } from './stubs';

const TESTING_MODULES = [
  FormsModule,
  HttpClientTestingModule,
  NoopAnimationsModule,
  SharedModule,
];

const TESTING_PROVIDERS = [
  { provide: Location, useClass: SpyLocation },
  {
    provide: Router,
    useClass: RouterMock,
  },
  provideMockStore(),
  // UI
  { provide: UiFormlyService, useClass: FormlyServiceMock },
];

const TESTING_DIRECTIVES = [RouterLinkDirectiveStub];

@NgModule({
  imports: [...TESTING_MODULES],
  declarations: [...TESTING_DIRECTIVES],
  exports: [...TESTING_MODULES, ...TESTING_DIRECTIVES],
  schemas: [NO_ERRORS_SCHEMA],
  providers: TESTING_PROVIDERS,
})
export class TestingModule {}
