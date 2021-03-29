/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { ComponentMock, createComponent, TestingModule } from '@testing';

import { DialogSuccessBlockComponent } from './dialog-success-block.component';

const providers = [
  { provide: MatDialogRef, useValue: { close: jest.fn() } },
  { provide: MAT_DIALOG_DATA, useValue: { text: 'text' } },
];
describe('DialogSuccessBlockComponent', () => {
  let component: DialogSuccessBlockComponent;
  let fixture: ComponentFixture<DialogSuccessBlockComponent>;
  let dialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DialogSuccessBlockComponent,
        ComponentMock({ selector: 'mat-dialog-content' }),
        ComponentMock({ selector: 'mat-icon' }),
      ],
      providers,
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSuccessBlockComponent);
    component = fixture.debugElement.componentInstance;
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
