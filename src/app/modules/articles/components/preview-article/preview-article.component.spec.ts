/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PreviewArticleComponent } from './preview-article.component';

describe('PreviewArticleComponent', () => {
  let component: PreviewArticleComponent;
  let fixture: ComponentFixture<PreviewArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewArticleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
