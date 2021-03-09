import { ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AuthFacade } from '@auth';
import { ArticlesFacade } from '@modules/articles';
import {
  TestingModule,
  createComponent,
  activateRouteMockFactory,
  ArticlesFacadeMock,
  AuthFacadeMock,
} from '@testing';
import { of } from 'rxjs';

import { PreviewArticleComponent } from './preview-article.component';
const imports = [TestingModule];
const providers = [
  {
    provide: AuthFacade,
    useClass: AuthFacadeMock,
  },
  {
    provide: ActivatedRoute,
    useFactory: activateRouteMockFactory({
      params: {
        id: '1',
      },
    }),
  },
];

describe('PreviewArticleComponent with selected article', () => {
  let component: PreviewArticleComponent;
  let fixture: ComponentFixture<PreviewArticleComponent>;

  beforeEach(() => {
    fixture = createComponent<PreviewArticleComponent>(
      PreviewArticleComponent,
      [
        ...providers,
        {
          provide: ArticlesFacade,
          useClass: ArticlesFacadeMock,
        },
      ],
      imports
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('PreviewArticleComponent without selected article', () => {
  let component: PreviewArticleComponent;
  let fixture: ComponentFixture<PreviewArticleComponent>;

  beforeEach(() => {
    fixture = createComponent<PreviewArticleComponent>(
      PreviewArticleComponent,
      [
        ...providers,
        {
          provide: ArticlesFacade,
          useValue: {
            loadArticleById: jest.fn(),
            selectedArticle$: of(null),
          },
        },
      ],
      imports
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
