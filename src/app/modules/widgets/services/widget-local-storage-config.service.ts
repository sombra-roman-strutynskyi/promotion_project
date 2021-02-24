import { Injectable } from '@angular/core';
import { AuthFacade } from '@auth';
import { isEmpty, isNil } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import {
  defaultWidgetsConfig,
  ICryptoCurrencyWidget,
  IWidgetsConfig,
} from '../models';

@Injectable()
export class WidgetLocalStorageConfigService {
  private storage = localStorage;
  private userId: string;
  private userWidgetConfig$ = new BehaviorSubject<IWidgetsConfig>(null);

  constructor(private authFacade: AuthFacade) {
    this.authFacade.currentUser$
      .pipe(
        filter((d) => !isEmpty(d)),
        take(1),
        map(({ uid }) => uid)
      )
      .subscribe((id) => {
        this.userId = id;
        const config =
          JSON.parse(this.storage.getItem(id)) || defaultWidgetsConfig;
        this.userWidgetConfig$.next(config);
      });
  }

  getCryptoCurrencyConfig(): Observable<ICryptoCurrencyWidget> {
    return this.getUserWidgetsConfig().pipe(
      map(({ cryptoCurrencyWidget }) => cryptoCurrencyWidget)
    );
  }

  setCryptoCurrencyConfig(cryptoCurrencyWidget: ICryptoCurrencyWidget) {
    this.getUserWidgetsConfig()
      .pipe(take(1))
      .subscribe((config) => {
        const widgetsConfig = {
          ...config,
          cryptoCurrencyWidget,
        };
        this.setUserWidgetsConfig(widgetsConfig);
      });
  }

  private getUserWidgetsConfig(): Observable<IWidgetsConfig> {
    return this.userWidgetConfig$.asObservable().pipe(filter((d) => !isNil(d)));
  }

  private setUserWidgetsConfig(config: IWidgetsConfig) {
    this.storage.setItem(this.userId, JSON.stringify(config));
    this.userWidgetConfig$.next(config);
  }
}
