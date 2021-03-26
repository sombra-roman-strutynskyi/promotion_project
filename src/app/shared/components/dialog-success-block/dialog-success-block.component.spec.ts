/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { createComponent, TestingModule } from '@testing';

import { DialogSuccessBlockComponent } from './dialog-success-block.component';

const imports = [TestingModule];
const providers = [
  { provide: MatDialogRef, useValue: { close: jest.fn() } },
  { provide: MAT_DIALOG_DATA, useValue: { text: 'text' } },
];
describe('DialogSuccessBlockComponent', () => {
  let component: DialogSuccessBlockComponent;
  let fixture: ComponentFixture<DialogSuccessBlockComponent>;
  let dialog;

  beforeEach(() => {
    fixture = createComponent<DialogSuccessBlockComponent>(
      DialogSuccessBlockComponent,
      providers,
      imports
    );
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should close when call onClick', () => {
    const spy = jest.spyOn(dialog, 'close');

    component.onClick();

    expect(spy).toHaveBeenCalled();
  });
});
