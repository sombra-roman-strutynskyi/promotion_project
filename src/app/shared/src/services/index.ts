import { FormService } from './form.service';
import { IconService } from './icon.service';
import { SnackbarService } from './snackbar.service';

export const SHARED_SERVICES = [IconService, FormService, SnackbarService];

export * from './icon.service';
export * from './form.service';
export * from './snackbar.service';
