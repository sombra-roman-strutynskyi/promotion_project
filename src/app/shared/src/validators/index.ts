// https://github.com/yuyang041060120/ng2-validation/blob/master/src/index.ts
import { email } from './email.validator';
import { equalTo, controlsEqual } from './equalTo.validator';

export const CustomValidators: any = {
  email,
  equalTo,
  controlsEqual,
};
