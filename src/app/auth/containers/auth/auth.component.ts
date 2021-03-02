import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { ROUTES_DATA, SubscriptionDisposer } from '@shared';
import { BehaviorSubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthFacade } from '../../services';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends SubscriptionDisposer implements OnInit {
  pending$ = this.authFacade.pending$;
  title = '';
  needShowTabs = false;
  activeTab = 0;
  tabs = [
    {
      title: ROUTES_DATA.AUTH.children.SIGN_IN.title,
      url: ROUTES_DATA.AUTH.children.SIGN_IN.path,
      path: `/${ROUTES_DATA.AUTH.children.SIGN_IN.url}`,
    },
    {
      title: ROUTES_DATA.AUTH.children.SIGN_UP.title,
      url: ROUTES_DATA.AUTH.children.SIGN_UP.path,
      path: `/${ROUTES_DATA.AUTH.children.SIGN_UP.url}`,
    },
  ];
  constructor(
    private activatedRoute: ActivatedRoute,
    private authFacade: AuthFacade,
    private router: Router,
    private location: Location
  ) {
    super();
  }

  ngOnInit(): void {
    this.configurationLayout();
    this.router.events
      .pipe(
        takeUntil(this.ngSubject),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.activeTab = this.tabs.indexOf(
          this.tabs.find((tab) => tab?.path === this.router.url)
        );
        this.configurationLayout();
      });
  }

  private configurationLayout(): void {
    this.title = this.getTitle();
    this.needShowTabs = this.showTabs();
  }

  private getTitle(): string {
    const route = this.activatedRoute.firstChild;
    if (route.outlet === 'primary') {
      return (route.data as BehaviorSubject<Data>).getValue()?.title;
    }
    return '';
  }

  private showTabs(): boolean {
    return this.tabs.some(({ title }) => title === this.title);
  }

  public goToBack(): void {
    this.location.back();
  }
}
