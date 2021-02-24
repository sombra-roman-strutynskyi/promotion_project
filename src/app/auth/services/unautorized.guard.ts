import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, take } from 'rxjs/operators';

@Injectable()
export class UnauthorizedGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.checkAuthed().pipe(
      map((authed) => {
        if (authed) {
          this.router.navigateByUrl('/');
        }
        return !authed;
      })
    );
  }

  private checkAuthed(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      distinctUntilChanged(),
      take(1),
      map((authState) => !!authState)
    );
  }
}
