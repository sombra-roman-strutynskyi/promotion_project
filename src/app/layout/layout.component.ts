import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '@auth';
import { ROUTES_DATA } from '@shared';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  _currentUser;
  @Input() set currentUser(data: IUser) {
    this._currentUser = isEmpty(data) ? null : data;
  }
  get currentUser() {
    return this._currentUser;
  }
  @Output() logouted = new EventEmitter<void>();
  constructor(private router: Router) {}

  public logout(): void {
    this.logouted.emit();
  }
  public goToEditUser(): void {
    this.router.navigateByUrl(ROUTES_DATA.PROFILE.url);
  }
  public goToHome(): void {
    this.router.navigateByUrl('/');
  }
}
