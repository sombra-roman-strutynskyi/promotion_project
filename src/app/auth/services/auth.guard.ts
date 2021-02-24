import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { ROUTES_DATA } from '@shared';
import { Observable } from 'rxjs';
import { take, map, distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.checkAuthed().pipe(
      map((auth) => {
        if (!auth) {
          this.router.navigate([ROUTES_DATA.AUTH.children.SIGN_IN.url]);
        }
        return auth;
      })
    );
  }

  canActivateChild(): Observable<boolean> {
    return this.checkAuthed();
  }

  private checkAuthed(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      distinctUntilChanged(),
      take(1),
      map((authState) => !!authState)
    );
  }
}
