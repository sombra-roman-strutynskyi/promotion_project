import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ROUTES_DATA, SubscriptionDisposer, UiFormButton } from '@shared';
import { of } from 'rxjs';
import { take, catchError, tap } from 'rxjs/operators';
import { AuthFacade, AuthFormService, AuthService } from '../../services';

type TMode = 'resetPassword' | 'verifyEmail';
enum Mode {
  RESET_PASSWORD = 'resetPassword',
  VERIFY_EMAIL = 'verifyEmail',
}

@Component({
  selector: 'auth-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent
  extends SubscriptionDisposer
  implements OnInit {
  fields: FormlyFieldConfig[];
  form = new FormGroup({});
  actionCode: string;
  userEmail: string;

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
  mode: TMode;
  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private formService: AuthFormService
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

  private configComponent(params): void {
    const { oobCode, mode } = params;

    this.mode = mode;
    this.actionCode = oobCode;

    switch (mode) {
      case Mode.RESET_PASSWORD:
        this.fields = this.formService.getResetPasswordFormFields(
          this.form,
          this.ngSubject
        );
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
      case Mode.VERIFY_EMAIL:
        this.authService.verifyEmailAddress(oobCode);
        this.goToLogin();
        break;
      default:
        this.goToLogin();
    }
  }

  public onSubmit({ newPassword }): void {
    this.authFacade.resetPassword(this.actionCode, newPassword, this.userEmail);
  }

  private goToLogin(): void {
    this.router.navigate([ROUTES_DATA.AUTH.children.SIGN_IN.url]);
  }
}
