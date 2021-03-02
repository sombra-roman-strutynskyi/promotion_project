import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ROUTES_DATA } from '@shared';
import { createComponent, TestingModule } from '@testing';

import { LayoutComponent } from './layout.component';
const imports = [TestingModule];

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let router: Router;

  beforeEach(() => {
    fixture = createComponent<LayoutComponent>(LayoutComponent, [], imports);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should logout', () => {
    const spy = jest.spyOn(component.logouted, 'emit');
    component.logout();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should redirect to profile', () => {
    const spy = jest.spyOn(router, 'navigateByUrl');
    component.goToEditUser();
    expect(spy).toHaveBeenCalledWith(ROUTES_DATA.PROFILE.url);
  });
  it('should redirect to home', () => {
    const spy = jest.spyOn(router, 'navigateByUrl');
    component.goToHome();
    expect(spy).toHaveBeenCalledWith('/');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
