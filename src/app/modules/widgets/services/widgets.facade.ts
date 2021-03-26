import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { WidgetsState } from '../state/widgets.reducer';
import { widgetsQuery } from '../state/widgets.selectors';

@Injectable()
export class WidgetsFacade {
  cryptoCurrencyTypes$ = this.store.pipe(
    select(widgetsQuery.getCryptoCurrencyTypes)
  );
  currencyTypes$ = this.store.pipe(select(widgetsQuery.getCurrencyTypes));
  pending$ = this.store.pipe(select(widgetsQuery.getPending));
  error$ = this.store.pipe(select(widgetsQuery.getError));

  constructor(private store: Store<WidgetsState>) {}
}
