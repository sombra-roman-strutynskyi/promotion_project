import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@auth';
import { CoreService } from '@core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currentUser$ = this.authFacade.currentUser$;
  constructor(
    private coreService: CoreService,
    private authFacade: AuthFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.coreService.initRouteSubscription();
    this.authFacade.loadProfile();
  }
  goToEditUser() {
    this.router.navigateByUrl('./');
  }
  logout() {
    this.authFacade.logout();
  }
}
