// tslint:disable:ban-types
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class RouterMock {
  navigate = jest.fn();
  navigateByUrl = jest.fn();
  events = of(null);
}
