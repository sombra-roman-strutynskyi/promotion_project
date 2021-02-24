import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@auth';
import { ROUTES_DATA } from './shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentUser$ = this.authFacade.currentUser$;
  constructor(private authFacade: AuthFacade, private router: Router) {}

  public goToEditUser(): void {
    this.router.navigateByUrl(ROUTES_DATA.PROFILE.url);
  }
  public goToHome(): void {
    this.router.navigateByUrl('/');
  }
  public logout(): void {
    this.authFacade.logout();
  }
}
