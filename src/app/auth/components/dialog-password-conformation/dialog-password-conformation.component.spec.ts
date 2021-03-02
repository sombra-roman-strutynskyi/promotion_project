/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { createComponent, MOCK_DIALOG_PASSWORD, TestingModule } from '@testing';

import { DialogPasswordConformationComponent } from './dialog-password-conformation.component';

const imports = [TestingModule];
const providers = [
  { provide: MatDialogRef, useValue: {} },
  { provide: MAT_DIALOG_DATA, useValue: MOCK_DIALOG_PASSWORD },
];
describe('DialogPasswordConformationComponent', () => {
  let component: DialogPasswordConformationComponent;
  let fixture: ComponentFixture<DialogPasswordConformationComponent>;
  beforeEach(() => {
    fixture = createComponent<DialogPasswordConformationComponent>(
      DialogPasswordConformationComponent,
      providers,
      imports
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
