import { Component, OnInit } from '@angular/core';
import { IUser, User } from '../../models';
import { AuthFacade } from '../../services';
import { SubscriptionDisposer, REGEXPS, IFormField, pick } from '@shared';
import { takeUntil, filter } from 'rxjs/operators';
import { changePassword } from '../../state/auth.actions';

@Component({
  selector: 'auth-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent extends SubscriptionDisposer implements OnInit {
  currentUser$ = this.authFacade.currentUser$;
  userFields: IFormField[] = [
    {
      key: 'firstName',
      label: 'First Name',

      type: 'text',
      syncValidator: {
        required: true,
      },
    },
    {
      key: 'lastName',
      label: 'Last Name',

      type: 'text',
      syncValidator: {
        required: true,
      },
    },
    {
      key: 'age',
      label: 'Age',
      type: 'number',
    },
  ];

  passwordFields = [
    {
      key: 'oldPassword',
      label: 'Old Password',
      type: 'password',
      syncValidator: {
        required: true,
        minLength: 6,
      },
    },
    {
      key: 'newPassword',
      label: 'New Password',
      type: 'password',
      syncValidator: {
        required: true,
        minLength: 6,
      },
    },
    {
      key: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      syncValidator: {
        required: true,
        minLength: 6,
      },
    },
  ];
  userModel = {} as IUser;
  passwordModel = {};
  constructor(private authFacade: AuthFacade) {
    super();
  }

  ngOnInit(): void {
    this.currentUser$
      .pipe(
        takeUntil(this.ngSubject),
        filter((data) => !!data)
      )
      .subscribe((user: IUser) => {
        const userFieldKeys: string[] = this.userFields.map(({ key }) => key);
        this.userModel = pick(user, ...userFieldKeys);
        console.log(this.userModel);
      });
  }
  updateProfile(user: IUser) {
    this.authFacade.updateProfile(user);
  }
  updatePassword(data) {
    this.authFacade.changePassword(data);
  }
  onFileSelected(ev) {
    const file = ev.target.files[0];
    console.log(file);
    
    this.authFacade.uploadUserAvatar(file)
  }
}
