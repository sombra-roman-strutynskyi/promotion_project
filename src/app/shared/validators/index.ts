import { ValidationErrors } from '@angular/forms';
import { email } from './email.validator';

export const CustomValidators: ValidationErrors = {
  email,
};
