/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DialogSuccessBlockComponent } from './dialog-success-block.component';

describe('DialogSuccessBlockComponent', () => {
  let component: DialogSuccessBlockComponent;
  let fixture: ComponentFixture<DialogSuccessBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogSuccessBlockComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSuccessBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
