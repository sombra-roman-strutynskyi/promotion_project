import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  Data,
  NavigationEnd,
  Params,
  Router,
} from '@angular/router';
import { capitalize, removeEmptyObjProperty } from '@shared';
import { BehaviorSubject } from 'rxjs';
import { filter, map, tap, distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class CoreService {
  private _currentUrl: string;
  private _previousUrl: string;
  private currentPageHeader$ = new BehaviorSubject<any>({});
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  /**
   * listen for NavigationEnd events
   * map routes by firstChild & filter for primary routes
   * so we select only parent routes
   */
  initRouteSubscription(): void {
    this._currentUrl = this.router.url;
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => {
        this._previousUrl =
          this._currentUrl !== '/' ? this._currentUrl : undefined;
        this._currentUrl = event.urlAfterRedirects;
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),

      filter((route) => route.outlet === 'primary'),
      tap((route) => {
        this.onRouteNavigationEnd(route);
      })
    );
  }

  private onRouteNavigationEnd(newRoute: ActivatedRoute) {
    this.updatePageHeader(newRoute);
  }

  /**
   * parse route data & params,
   * update page header stream with new title, subtitle
   */

  private updatePageHeader(newRoute: ActivatedRoute) {
    const parentParams = (newRoute.parent
      .params as BehaviorSubject<Params>).getValue();
    const routeParams = (newRoute.params as BehaviorSubject<Params>).getValue();
    const routeData = (newRoute.data as BehaviorSubject<Data>).getValue();
    // tslint:disable:prefer-const
    let { title, subtitle } = routeData;
    // tslint:enable
    let substring = '';
    // INFO: update route data for page headers if needed
    if ('parseParamsTitle' in routeData && routeData.parseParamsTitle.length) {
      substring =
        routeParams[routeData.parseParamsTitle[0]] ||
        parentParams[routeData.parseParamsTitle[0]];
    }
    if (!!title) {
      title = [title, capitalize(substring)].join(' ');
    }

    this.currentPageHeader$.next(removeEmptyObjProperty({ title, subtitle }));
  }

  getCurrentPageHeader() {
    return this.currentPageHeader$.asObservable().pipe(distinctUntilChanged());
  }
}
