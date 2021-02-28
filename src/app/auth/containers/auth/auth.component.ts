import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  ActivatedRoute,
  Data,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { ROUTES_DATA, SubscriptionDisposer } from '@shared';
import { of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
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
    },
    {
      title: ROUTES_DATA.AUTH.children.SIGN_UP.title,
      url: ROUTES_DATA.AUTH.children.SIGN_UP.path,
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
          this.tabs.find((tab) => tab?.url === '.' + this.router.url)
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
