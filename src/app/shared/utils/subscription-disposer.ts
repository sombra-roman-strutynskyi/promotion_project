import { OnDestroy, Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  template: '',
})
export abstract class SubscriptionDisposer implements OnDestroy {
  public ngSubject = new Subject<void>();

  public ngOnDestroy(): void {
    this.ngSubject.next();
    this.ngSubject.complete();
  }
}
