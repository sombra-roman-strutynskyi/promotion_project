import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@auth';
import { ROUTES_DATA } from './shared/src/constants/routePaths';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currentUser$ = this.authFacade.currentUser$;
  constructor(private authFacade: AuthFacade, private router: Router) {}

  ngOnInit() {
    this.authFacade.loadProfile();
  }
  goToEditUser() {
    this.router.navigateByUrl(ROUTES_DATA.PROFILE.url);
  }
  goToHome() {
    this.router.navigateByUrl('/');
  }
  logout() {
    this.authFacade.logout();
  }
}
