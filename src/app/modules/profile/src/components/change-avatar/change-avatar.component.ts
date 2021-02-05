import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'profile-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeAvatarComponent {
  _photoURL: string;
  @Input() set photoURL(url: string) {
    this._photoURL = !!url ? url : './assets/images/user.svg';
  }
  get photoURL(): string {
    return this._photoURL;
  }
  @Output() submitted = new EventEmitter<File>();

  updateUserAvatar(ev) {
    const file = ev.target.files[0];
    this.submitted.emit(file);
  }
}
