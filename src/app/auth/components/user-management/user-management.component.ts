import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ROUTES_DATA, SubscriptionDisposer, UiFormButton } from '@shared';
import { of } from 'rxjs';
import { take, catchError, tap } from 'rxjs/operators';
import { AuthFacade, AuthService } from '../../services';

type TRequestMode = 'resetPassword' | 'verifyEmail';

@Component({
  selector: 'auth-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent
  extends SubscriptionDisposer
  implements OnInit {
  form = new FormGroup({});
  actionCode: string;
  userEmail: string;
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          key: 'newPassword',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'New Password',
            placeholder: '•'.repeat(8),
            required: true,
            minLength: 6,
          },
        },
        {
          className: 'col-12',
          key: 'confirmPassword',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Confirm Password',
            placeholder: '•'.repeat(8),
          },
          validators: {
            fieldMatch: {
              expression: (control) => control.value === this.model.newPassword,
              message: 'Password Not Matching',
            },
          },
          expressionProperties: {
            'templateOptions.disabled': () =>
              !this.form.get('newPassword').valid,
          },
        },
      ],
    },
  ];

  formButtons: UiFormButton[] = [
    {
      label: 'Reset Password',
      type: 'submit',
      classNames: 'col-12',
      action: { type: 'submit' },
      style: {
        color: 'accent',
        type: 'raised',
      },
    },
  ];

  formOptions: FormlyFormOptions = {
    formState: {
      showErrorState: false,
      disabled: false,
    },
  };
  model = { newPassword: '' };
  mode: TRequestMode;
  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(take(1))
      .subscribe((params: Params) => {
        if (!params) {
          this.goToLogin();
        }
        this.configComponent(params);
      });
  }

  configComponent(params) {
    const { oobCode, mode } = params;

    this.mode = mode;
    this.actionCode = oobCode;

    switch (mode) {
      case 'resetPassword':
        this.authService
          .verifyPasswordResetCode(oobCode)
          .pipe(
            take(1),
            tap((email: string) => {
              this.userEmail = email;
            }),
            catchError(() => {
              this.goToLogin();
              return of(null);
            })
          )
          .subscribe();
        break;
      case 'verifyEmail':
        this.authService.verifyEmailAddress(oobCode);
        this.goToLogin();
        break;
      default:
        this.goToLogin();
    }
  }

  onSubmit({ newPassword }) {
    this.authFacade.resetPassword(this.actionCode, newPassword, this.userEmail);
  }

  goToLogin() {
    this.router.navigate([ROUTES_DATA.AUTH.children.SIGN_IN.url]);
  }
}
