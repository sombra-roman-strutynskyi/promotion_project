/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DialogPasswordConformationComponent } from './dialog-password-conformation.component';

describe('DialogPasswordConformationComponent', () => {
  let component: DialogPasswordConformationComponent;
  let fixture: ComponentFixture<DialogPasswordConformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogPasswordConformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPasswordConformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
