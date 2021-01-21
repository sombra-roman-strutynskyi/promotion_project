import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CoreService } from '@core';
import { ROUTES_DATA, SubscriptionDisposer } from '@shared';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthFacade } from '../../services';

@Component({
  selector: 'auth-layout',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends SubscriptionDisposer implements OnInit {
  pending$ = this.authFacade.pending$;

  header;
  activeTab = 0;
  tabs = [
    {
      title: ROUTES_DATA.AUTH.children.SIGN_IN.title,
      url: ROUTES_DATA.AUTH.children.SIGN_IN.path,
    },
    {
      title: ROUTES_DATA.AUTH.children.SIGN_UP.title,
      url: ROUTES_DATA.AUTH.children.SIGN_UP.path,
    },
  ];
  constructor(
    private coreService: CoreService,
    private authFacade: AuthFacade,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        takeUntil(this.ngSubject),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.activeTab = this.tabs.indexOf(
          this.tabs.find((tab) => tab?.url === '.' + this.router.url)
        );
      });

    this.coreService
      .getCurrentPageHeader()
      .pipe(takeUntil(this.ngSubject))
      .subscribe((header) => {
        this.header = header;
      });
  }
}
