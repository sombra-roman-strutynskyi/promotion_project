import { Component, OnInit } from '@angular/core';
import { CoreService } from '@core';
import { isNullOrUndefined, SubscriptionDisposer } from '@shared';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends SubscriptionDisposer implements OnInit {
  header;
  constructor(
    private coreService: CoreService
  ) {
    super();
  }

  ngOnInit() {
    this.coreService
      .getCurrentPageHeader()
      .pipe(takeUntil(this.ngSubject))
      .subscribe((header) => {

        this.header = header;
      });
  }
}
