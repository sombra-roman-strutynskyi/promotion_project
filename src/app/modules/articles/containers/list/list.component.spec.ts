import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticlesFacade } from '@modules/articles';
import { ArticlesFacadeMock, ComponentMock, TestingModule } from '@testing';

import { ListComponent } from './list.component';

const imports = [TestingModule];
const providers = [
  {
    provide: ArticlesFacade,
    useClass: ArticlesFacadeMock,
  },
];
describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListComponent,
        ComponentMock({
          selector: 'articles-item-article',
          inputs: ['article'],
        }),
      ],
      imports,
      providers,
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
