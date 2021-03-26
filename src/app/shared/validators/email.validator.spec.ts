import { FormControl } from '@angular/forms';
import { email } from './email.validator';

describe('Email Validator', () => {
  it('should return null', () => {
    expect(email(new FormControl('test@email.com'))).toEqual(null);
    expect(email(new FormControl())).toEqual(null);
  });
  it('should email invalid', () => {
    expect(email(new FormControl('test_email.com'))).toEqual({ email: true });
  });
});
