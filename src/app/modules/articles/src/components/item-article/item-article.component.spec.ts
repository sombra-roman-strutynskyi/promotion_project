/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ItemArticleComponent } from './item-article.component';

describe('ItemArticleComponent', () => {
  let component: ItemArticleComponent;
  let fixture: ComponentFixture<ItemArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemArticleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
