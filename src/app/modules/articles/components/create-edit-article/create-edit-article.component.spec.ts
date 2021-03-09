import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AuthFacade } from '@auth';
import {
  ArticlesFacade,
  CreateEditArticleFormConfigService,
} from '@modules/articles';
import {
  TestingModule,
  createComponent,
  ArticlesFacadeMock,
  AuthFacadeMock,
  activateRouteMockFactory,
  MOCK_MODIFY_ARTICLE,
  MOCK_ARTICLE,
} from '@testing';
import { of } from 'rxjs';
import { CreateEditArticleComponent } from './create-edit-article.component';

const imports = [TestingModule];
const providers = [
  {
    provide: AuthFacade,
    useClass: AuthFacadeMock,
  },
  {
    provide: CreateEditArticleFormConfigService,
    useValue: {
      getFormFields: jest.fn((imageUrl) => [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-12',
              key: 'title',
              type: 'input',
              templateOptions: {
                type: 'text',
                label: 'Title',
                required: true,
                minLength: 10,
                maxLength: 100,
              },
            },
            {
              className: 'col-12',
              key: 'body',
              type: 'textarea',
              templateOptions: {
                rows: 10,
                label: 'Body',
                required: true,
                minLength: 10,
              },
            },
            {
              className: 'col-12',
              key: 'image',
              type: 'file',
              templateOptions: {
                label: 'Image',
                required: !imageUrl,
                imageUrl,
              },
              validation: {
                show: true,
                messages: {
                  required: () => `Please select image`,
                },
              },
            },
          ],
        },
      ]),
      getFormButtons: jest.fn(() => [
        {
          label: 'Cancel',
          type: 'button',
          classWrapper: 'col row no-gutters justify-content-end ',
          action: { type: 'cancel' },
          style: {
            color: 'primary',
          },
        },
        {
          label: 'Update',
          type: 'submit',
          action: { type: 'submit' },
          classWrapper: 'col-auto',
          style: {
            color: 'accent',
            type: 'raised',
          },
        },
      ]),
    },
  },
];
describe('CreateEditArticleComponent  ', () => {
  describe('Edit Mode', () => {
    let fixture: ComponentFixture<CreateEditArticleComponent>;
    let component: CreateEditArticleComponent;
    let articlesFacade: ArticlesFacade;
    let location: Location;
    beforeEach(() => {
      fixture = createComponent<CreateEditArticleComponent>(
        CreateEditArticleComponent,
        [
          ...providers,
          {
            provide: ActivatedRoute,
            useFactory: activateRouteMockFactory({
              params: {
                id: '1',
              },
            }),
          },
          {
            provide: ArticlesFacade,
            useClass: ArticlesFacadeMock,
          },
        ],
        imports
      );
      component = fixture.componentInstance;
      location = TestBed.inject(Location);
      articlesFacade = TestBed.inject(ArticlesFacade);

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should submit form', () => {
      const spy = jest.spyOn(
        CreateEditArticleComponent.prototype as any,
        'updateArticle'
      );

      component.onSubmit(MOCK_ARTICLE);
      expect(spy).toHaveBeenCalledWith(MOCK_MODIFY_ARTICLE);
    });
    it('should cancel form', () => {
      const spy = jest.spyOn(location, 'back');
      component.onCancel();
      expect(spy).toHaveBeenCalled();
    });
    it('should remove article', () => {
      const spy = jest.spyOn(articlesFacade, 'removeArticle');
      component.onRemoveArticle();
      expect(spy).toHaveBeenCalledWith('1');
    });

    afterEach(() => {
      fixture.destroy();
    });
  });
  describe('Create Mode', () => {
    let fixture: ComponentFixture<CreateEditArticleComponent>;
    let component: CreateEditArticleComponent;
    let articlesFacade: ArticlesFacade;
    let location: Location;
    beforeEach(() => {
      fixture = createComponent<CreateEditArticleComponent>(
        CreateEditArticleComponent,
        [
          ...providers,
          {
            provide: ActivatedRoute,
            useFactory: activateRouteMockFactory({
              params: {
                id: null,
              },
            }),
          },
          {
            provide: ArticlesFacade,
            useClass: ArticlesFacadeMock,
          },
        ],
        imports
      );
      component = fixture.componentInstance;
      location = TestBed.inject(Location);
      articlesFacade = TestBed.inject(ArticlesFacade);

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should submit form', () => {
      const spy = jest.spyOn(
        CreateEditArticleComponent.prototype as any,
        'createArticle'
      );

      component.onSubmit(MOCK_ARTICLE);
      expect(spy).toHaveBeenCalledWith(MOCK_MODIFY_ARTICLE);
    });

    afterEach(() => {
      fixture.destroy();
    });
  });
  describe('Need load article', () => {
    let fixture: ComponentFixture<CreateEditArticleComponent>;
    let component: CreateEditArticleComponent;
    let articlesFacade: ArticlesFacade;
    beforeEach(() => {
      fixture = createComponent<CreateEditArticleComponent>(
        CreateEditArticleComponent,
        [
          ...providers,
          {
            provide: ActivatedRoute,
            useFactory: activateRouteMockFactory({
              params: {
                id: '1',
              },
            }),
          },
          {
            provide: ArticlesFacade,
            useValue: {
              selectedArticle$: of(null),
              loadArticleById: jest.fn(),
            },
          },
        ],
        imports
      );
      component = fixture.componentInstance;
      articlesFacade = TestBed.inject(ArticlesFacade);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    afterEach(() => {
      fixture.destroy();
    });
  });
});
