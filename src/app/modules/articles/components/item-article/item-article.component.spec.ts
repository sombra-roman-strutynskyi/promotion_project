import { ComponentFixture } from '@angular/core/testing';
import { createComponent, MOCK_ARTICLE, TestingModule } from '@testing';

import { ItemArticleComponent } from './item-article.component';

const imports = [TestingModule];

describe('ItemArticleComponent', () => {
  let component: ItemArticleComponent;
  let fixture: ComponentFixture<ItemArticleComponent>;

  beforeEach(() => {
    fixture = createComponent<ItemArticleComponent>(
      ItemArticleComponent,
      [],
      imports
    );
    component = fixture.componentInstance;
    component.article = MOCK_ARTICLE;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
