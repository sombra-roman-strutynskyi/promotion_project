import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthFacade } from '@auth';
import { AuthFacadeMock, ComponentMock } from '@testing';
import { AppComponent } from './app.component';
import { TestingModule } from './testing/testing.module';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authFacade: AuthFacade;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, RouterTestingModule],
      declarations: [
        AppComponent,
        ComponentMock({ selector: 'app-layout', inputs: ['currentUser'] }),
      ],
      providers: [
        {
          provide: AuthFacade,
          useClass: AuthFacadeMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    authFacade = TestBed.inject(AuthFacade);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
  it('should logout', () => {
    const spy = jest.spyOn(authFacade, 'logout');
    app.logout();
    expect(spy).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
