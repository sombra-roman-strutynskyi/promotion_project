import { Component } from '@angular/core';
import { AuthFacade } from '@auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentUser$ = this.authFacade.currentUser$;
  constructor(private authFacade: AuthFacade) {}

  public logout(): void {
    this.authFacade.logout();
  }
}
