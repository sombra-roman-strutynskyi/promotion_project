import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { isEmpty } from 'lodash';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  _currentUser;
  @Input() set currentUser(data) {
    this._currentUser = isEmpty(data) ? null : data;
  }
  get currentUser() {
    return this._currentUser;
  }
  @Output() logouted = new EventEmitter<void>();
  @Output() editedUser = new EventEmitter<void>();
  @Output() wentToHome = new EventEmitter<void>();

  goToEditUser() {
    this.editedUser.emit();
  }

  goToHome() {
    this.wentToHome.emit();
  }

  logout() {
    this.logouted.emit();
  }
}
