import {Location} from '@angular/common';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {combineLatest, forkJoin, fromEvent, merge, of, timer} from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  tap,
  switchMap,
  switchMapTo,
  filter,
  withLatestFrom,
} from 'rxjs/operators';
import {
  Credentials,
} from '../models';
import {AuthFacade} from '../services/auth.facade';
import * as AuthActions from './auth.actions';
import {authQuery} from './auth.selectors';

const IDLE_TIMEOUT = 30 * 60 * 1000 + 10; // 30 minute inactivity timeout

@Injectable()
export class AuthEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
    private authFacade: AuthFacade,
    private store$: Store<any>,
    private route: ActivatedRoute
  ) {
  }

//   login$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.login),
//       map(action => action.credentials),
//       switchMap((credentials: Credentials) =>
//         this.authService.authenticate('email', credentials).pipe(
//           map((result: NbAuthResult) => {
//             return result.isSuccess()
//               ? AuthActions.loginSuccess({result})
//               : this.getActionForAuthApiError(
//                 result.getResponse(),
//                 'loginFailure'
//               );
//           })
//         )
//       )
//     )
//   );

//   loginSuccess$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType(AuthActions.loginSuccess),
//         withLatestFrom(this.store$.select(authQuery.getEmailToken)),
//         tap(() => this.store$.dispatch(AuthActions.checkTokenSuccess())),
//         tap(([action]) => {
//           let redirect = action.result.getRedirect();
//           // check for super admin
//           return this.router.navigateByUrl(redirect);
//         })
//       ),
//     {dispatch: false}
//   );

//   actionsSuccess$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType(AuthActions.registerSuccess, AuthActions.resetPasswordSuccess),
//         tap(({result}) => {
//           const redirect = result.getRedirect();
//           if (redirect) {
//             return this.router.navigateByUrl(redirect);
//           }
//         })
//       ),
//     {dispatch: false}
//   );

//   requestPassword$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.requestPassword),
//       map(action => action.email),
//       switchMap(email =>
//         this.authService.requestPassword('email', {email}).pipe(
//           map((result: NbAuthResult) => {
//             return result.isSuccess()
//               ? AuthActions.requestPasswordSuccess({result})
//               : this.getActionForAuthApiError(
//                 result.getResponse(),
//                 'requestPasswordFailure'
//               );
//           }),
//           catchError(error =>
//             of(this.getActionForAuthApiError(error, 'requestPasswordFailure'))
//           )
//         )
//       )
//     )
//   );

//   resetPassword$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.resetPassword),
//       map(action => action.credentials),
//       switchMap(credentials =>
//         this.authService.resetPassword('email', {...credentials}).pipe(
//           map((result: NbAuthResult) => {
//             return result.isSuccess()
//               ? AuthActions.resetPasswordSuccess({result})
//               : this.getActionForAuthApiError(
//                 result.getResponse(),
//                 'resetPasswordFailure'
//               );
//           }),
//           catchError(error =>
//             of(this.getActionForAuthApiError(error, 'resetPasswordFailure'))
//           )
//         )
//       )
//     )
//   );

//   authNavigate$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType(AuthActions.authNavigate),
//         tap(({route}) => {
//           this.router.navigateByUrl(`/auth/${route}`);
//         })
//       ),
//     {dispatch: false}
//   );

//   loginRedirect$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType(AuthActions.loginRedirect, AuthActions.checkTokenFailure),
//         tap(() => {
//           if (!checkWhiteList(this.whiteList, this.location.path())) {
//             this.permissionsService.flushPermissions();
//             this.rolesService.flushRoles();
//             this.router.navigateByUrl('/auth/login');
//           }
//         })
//       ),
//     {dispatch: false}
//   );

//   logoutConfirmation$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.logoutConfirmation),
//       switchMap(() => {
//         const dialogRef = this.modalService
//           .create('logout', 'Are you sure you want to sign out?', {
//             title: 'Sign Out Confirmation',
//           })
//           .open();
//         return dialogRef.onClose;
//       }),
//       map(result =>
//         result ? AuthActions.logout() : AuthActions.logoutConfirmationDismiss()
//       )
//     )
//   );

//   logout$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.logout),
//       exhaustMap(() =>
//         this.authService.logout('email').pipe(
//           map(() => AuthActions.loginRedirect()),
//           catchError(() => of(AuthActions.loginRedirect()))
//         )
//       )
//     )
//   );

//   checkToken$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.checkToken),
//       exhaustMap(() =>
//         this.authService
//           .isAuthenticated()
//           .pipe(
//             map(authenticated =>
//               authenticated
//                 ? AuthActions.checkTokenSuccess()
//                 : AuthActions.checkTokenFailure()
//             )
//           )
//       )
//     )
//   );

//   checkTokenSuccess$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.checkTokenSuccess),
//       map(() => AuthActions.loadUserProfile())
//     )
//   );

//   idle$ = createEffect(() =>
//     merge(this.  clicks$, this.keys$, this.mouse$).pipe(
//       switchMapTo(timer(IDLE_TIMEOUT)),
//       withLatestFrom(this.authFacade.isAuthenticated$),
//       map(([, logged]) => {
//         if (logged) {
//           if (this.isDfe) {
//             return AuthActions.idleTimeout();
//           }
//           return AuthActions.loadUserProfile();
//         }
//         return {type: '[Auth] User is not authenticated'};
//       })
//     )
//   );

//   logoutIdleUser$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.idleTimeout),
//       map(() => AuthActions.logout())
//     )
//   );

//   authFailureWithException$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType(AuthActions.authFailureWithException),
//         tap(({exception, errorCode}) => {
//           const dialogRef = this.modalService
//             .create(`authError_${errorCode}`, 'null', {
//               title: exception.title,
//               okOnly: true,
//               closable: false,
//             })
//             .setData({innerHtml: exception.errorMessage})
//             .open();

//           dialogRef.onClose.subscribe(() => {
//             this.router.navigateByUrl('/auth/login');
//           });

//           return dialogRef;
//         })
//       ),
//     {dispatch: false}
//   );

//   completeRegistration$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.completeRegistration),
//       map(action => action.credentials),
//       switchMap((credentials: CompleteRegistrationCredentials) => {
//         const token = this.getToken();
//         if (this.isDfe) {
//           return this.authService
//             .refreshToken('email', {token, ...credentials})
//             .pipe(
//               map((result: NbAuthResult) => {
//                 return result.isSuccess()
//                   ? AuthActions.completeRegistrationSuccess({result})
//                   : this.getActionForAuthApiError(
//                     result.getResponse(),
//                     'completeRegistrationFailure'
//                   );
//               })
//             );
//         } else {
//           return this.apiService
//             .completeRegistration('email', {credentials})
//             .pipe(
//               map(result => {
//                 return AuthActions.completeRegistrationSuccess({result});
//               }),
//               catchError(err =>
//                 of(
//                   AuthActions.openFailureCompleteRegistrationModal({
//                     errors: err,
//                   })
//                 )
//               )
//             );
//         }
//       })
//     )
//   );

//   openFailureCompleteRegistrationModal$ = createEffect(
//     () => {
//       return this.actions$.pipe(
//         ofType(AuthActions.openFailureCompleteRegistrationModal),
//         tap(err => {
//           const errorMessage = err.errors.error.errorFields[0].message;
//           // language=HTML
//           this.modalService
//             .create('confirmationId', '', {
//               title: 'Warning',
//               closable: false,
//               okOnly: true,
//             })
//             .setData({innerHtml: errorMessage})
//             .open();
//         })
//       );
//     },
//     {dispatch: false}
//   );

//   completeRegistrationSuccess$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType(AuthActions.completeRegistrationSuccess),
//         map(action => action.result),
//         tap(result => {
//           if (this.isDfe) {
//             const redirect = result.getRedirect();
//             return this.router.navigateByUrl(redirect);
//           } else {
//             return this.router.navigateByUrl('/');
//           }
//         }),
//         map(() => AuthActions.checkTokenSuccess())
//       ),
//     {dispatch: false}
//   );

//   register$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.register),
//       map(action => action.credentials),
//       switchMap((credentials: any) => {
//         return this.authService.register('email', {...credentials}).pipe(
//           map((result: NbAuthResult) => {
//             return result.isSuccess()
//               ? AuthActions.registerSuccess({result})
//               : AuthActions.registerFailure({error: result.getResponse()});
//           }),
//           catchError(error =>
//             of(this.getActionForAuthApiError(error, 'registerFailure'))
//           )
//         );
//       })
//     )
//   );

//   checkUrlToken$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.checkUrlToken),
//       switchMap(() =>
//         this.apiService.checkToken().pipe(
//           map((result: any) =>
//             AuthActions.checkUrlTokenSuccess({email: result.data})
//           ),
//           catchError(error =>
//             of(this.getActionForAuthApiError(error, 'checkUrlTokenFailure'))
//           )
//         )
//       )
//     )
//   );

//   requestAccountUserInfo$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.requestAccountUserInfo),
//       switchMap(() =>
//         this.apiService.requestAccountUser().pipe(
//           map((result: object) =>
//             AuthActions.requestAccountUserInfoSuccess({userData: result})
//           ),
//           catchError(error =>
//             of(
//               this.getActionForAuthApiError(
//                 error,
//                 'requestAccountUserInfoFailure'
//               )
//             )
//           )
//         )
//       )
//     )
//   );

//   requestAccountApprove$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.requestAccountApprove),
//       map(action => action.formData),
//       switchMap(formData =>
//         this.apiService.approveRequestAccount({formData}).pipe(
//           map((result: object) => AuthActions.requestAccountApproveSuccess()),
//           catchError(error =>
//             of(
//               this.getActionForAuthApiError(
//                 error,
//                 'requestAccountApproveFailure'
//               )
//             )
//           )
//         )
//       )
//     )
//   );

//   requestAccountReject$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.requestAccountReject),
//       switchMap(() =>
//         this.apiService.rejectRequestAccount().pipe(
//           map((result: object) => AuthActions.requestAccountRejectSuccess()),
//           catchError(error =>
//             of(
//               this.getActionForAuthApiError(
//                 error,
//                 'requestAccountRejectFailure'
//               )
//             )
//           )
//         )
//       )
//     )
//   );

//   requestAccountSuccess$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType(
//           AuthActions.requestAccountApproveSuccess,
//           AuthActions.requestAccountRejectSuccess
//         ),
//         tap(() => this.router.navigateByUrl('/'))
//       ),
//     {dispatch: false}
//   );

//   userProfile$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.loadUserProfile),
//       switchMap(() =>
//         this.apiService.getCurrentUser().pipe(
//           map((result: any) => {
//             const userPermissions = getUserPermissions(result);
//             const userRole = getUserRole(result);
//             this.permissionsService.addPermission(userPermissions);
//             this.rolesService.addRole(userRole, userPermissions);
//             return AuthActions.loadUserProfileSuccess({
//               currentUser: result.data,
//             });
//           }),
//           catchError(error =>
//             of(this.getActionForAuthApiError(error, 'loadUserProfileFailure'))
//           )
//         )
//       )
//     )
//   );

//   updateProfile$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.updateProfile),
//       map(action => action),
//       withLatestFrom(this.store$.select(authQuery.getUser)),
//       switchMap(([{userData: newValue, userImage}, currentValue]) => {
//         // check if email changed & return combined obs of new user data & confirmation result
//         const newEmail = newValue.email !== currentValue.email;
//         if (newEmail) {
//           const dialogRef = this.modalService
//             .create('email_confirmation_modal', 'null', {
//               title: 'Attention!',
//               okButtonLabel: 'Yes',
//               cancelButtonLabel: 'No',
//               closable: false,
//             })
//             .setData({
//               innerHtml:
//                 '<p>This email address is required for login credentials. Changing the email will impact login. Are you sure you want to change the Email?</p>',
//             })
//             .open();
//           // tslint:disable-next-line: deprecation
//           return combineLatest(
//             of(newValue),
//             dialogRef.onClose,
//             of(newEmail),
//             of(userImage)
//           );
//         } else {
//           // tslint:disable-next-line: deprecation
//           return combineLatest(
//             of(newValue),
//             of(null),
//             of(newEmail),
//             of(userImage)
//           );
//         }
//       }),
//       switchMap(([newValue, confirm, newEmail, userImage]) => {
//         if (isBoolean(confirm) && confirm === false) {
//           // skip saving profile
//           return of(AuthActions.cancelEditProfile());
//         } else {
//           const requests = [
//             this.apiService
//               .updateProfileChanges({...newValue})
//               .pipe(map(({data}) => data)),
//           ];
//           if (!isUndefined(userImage)) {
//             if (userImage) {
//               requests.push(
//                 this.apiService.uploadProfileImage(userImage).pipe(
//                   filter(
//                     (event: HttpEvent<any>) =>
//                       event.type === HttpEventType.Response
//                   ),
//                   map(res =>
//                     this.isDfe
//                       ? res['body'].data.photoUrl + `?timeStamp=${Date.now()}`
//                       : res['body'].data.photoUrl
//                   )
//                 )
//               );
//             } else {
//               requests.push(
//                 this.apiService
//                   .deleteProfileImage()
//                   .pipe(map(({data}) => data))
//               );
//             }
//           }
//           return forkJoin(requests).pipe(
//             map(([data, photoUrl]) => {
//               if (newEmail) {
//                 return AuthActions.logout();
//               }
//               return AuthActions.updateProfileSuccess({
//                 user: {
//                   ...data,
//                   photoUrl: isUndefined(photoUrl) ? data.photoUrl : photoUrl,
//                 },
//               });
//             }),
//             catchError(error => of(AuthActions.updateProfileFailure({error})))
//           );
//         }
//       })
//     )
//   );

//   updateProfileSuccess$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType(AuthActions.updateProfileSuccess),
//         tap(() => {
//           if (this.isDfe) {
//             this.location.back();
//           }
//         })
//       ),
//     {dispatch: false}
//   );

//   switchCompany$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.switchCompany),
//       switchMap(({id}) =>
//         this.apiService.switchCompany(id).pipe(
//           map(() => AuthActions.switchCompanySuccess()),
//           catchError(error => of(AuthActions.updateProfileFailure({error})))
//         )
//       )
//     )
//   );

//   switchYear$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.switchYear),
//       switchMap(({year}) =>
//         this.apiService.switchYear(year).pipe(
//           map(() => AuthActions.switchYearSuccess()),
//           catchError(error => of(AuthActions.updateProfileFailure({error})))
//         )
//       )
//     )
//   );

//   reloadWindow$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType(AuthActions.switchCompanySuccess, AuthActions.switchYearSuccess),
//         tap(() => {
//           this.windowService.nativeWindow.location.reload();
//         })
//       ),
//     {dispatch: false}
//   );

//   private getActionForAuthApiError(
//     err: HttpErrorResponse,
//     failureAction: string
//   ) {
//     if (err instanceof ApiErrorResponse && err.status !== 401) {
//       switch (err.error.errorType) {
//         case ErrorTypeEnum.EXCEPTION:
//           return AuthActions.authFailureWithException({
//             exception: err.getException(),
//             errorCode: err.error.errorCode,
//           });
//         case ErrorTypeEnum.VALIDATION:
//           return AuthActions[failureAction]({
//             errors: err.getErrors(),
//           });
//         default:
//           return AuthActions.commonAuthFailure({
//             errors: [ERROR_MESSAGES.default],
//           });
//       }
//     }
//     return AuthActions.loginFailure({
//       errors: [ERROR_MESSAGES.default],
//     });
//   }

//   private getToken(): string {
//     const token = this.route.snapshot.queryParams['token'];
//     return token ? token : null;
//   }

//   /**
//    * @description
//    * Action to be dispatched after the effect is registered.
//    */
//   ngrxOnInitEffects(): Action {
//     return {type: '[Auth] Start '};
//   }
}
