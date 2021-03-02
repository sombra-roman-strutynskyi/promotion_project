import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthFacade } from '@auth';
import { ROUTES_DATA } from '@shared';

import {
  activateRouteMockFactory,
  AuthFacadeMock,
  createComponent,
  TestingModule,
} from '@testing';
import { of } from 'rxjs';
import { AuthComponent } from './auth.component';

const MOCK_TITLE = 'title';
const imports = [TestingModule, RouterTestingModule];

const providers = [
  {
    provide: AuthFacade,
    useClass: AuthFacadeMock,
  },
  {
    provide: Router,
    useValue: {
      events: of(new NavigationEnd(1, '', '')),
      url: `/${ROUTES_DATA.AUTH.children.SIGN_UP.url}`,
    },
  },
];
describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let location: Location;
  describe('Render With Outlet', () => {
    beforeEach(() => {
      fixture = createComponent<AuthComponent>(
        AuthComponent,
        [
          ...providers,
          {
            provide: ActivatedRoute,
            useFactory: activateRouteMockFactory({
              firstChild: {
                outlet: 'primary',
                data: {
                  title: MOCK_TITLE,
                },
              },
            }),
          },
        ],
        imports
      );
      component = fixture.componentInstance;
      location = TestBed.inject(Location);
      fixture.detectChanges();
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should call `location.back()`', () => {
      const spy = jest.spyOn(location, 'back');
      component.goToBack();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    afterEach(() => {
      fixture.destroy();
    });
  });
  describe('Render Without Outlet', () => {
    beforeEach(() => {
      fixture = createComponent<AuthComponent>(
        AuthComponent,
        [
          ...providers,
          {
            provide: ActivatedRoute,
            useFactory: activateRouteMockFactory({}),
          },
        ],
        imports
      );
      component = fixture.componentInstance;
      location = TestBed.inject(Location);
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
