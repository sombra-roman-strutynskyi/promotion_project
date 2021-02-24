import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { IUser } from '@auth';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  @Input() currentUser: IUser;
  @Output() logouted = new EventEmitter<void>();
  @Output() editedUser = new EventEmitter<void>();
  @Output() wentToHome = new EventEmitter<void>();

  logout() {
    this.logouted.emit();
  }
  goToEditUser() {
    this.editedUser.emit();
  }
  goToHome() {
    this.wentToHome.emit();
  }
}
