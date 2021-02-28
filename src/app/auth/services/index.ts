import { AuthFormService } from './auth-form.service';
import { AuthFacade } from './auth.facade';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UnauthorizedGuard } from './unautorized.guard';

export const SERVICES = [
  AuthFacade,
  AuthService,
  AuthGuard,
  UnauthorizedGuard,
  AuthFormService,
];

export * from './auth.facade';
export * from './auth.service';
export * from './auth.guard';
export * from './unautorized.guard';
export * from './auth-form.service';
