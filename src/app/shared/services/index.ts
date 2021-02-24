import { IconService } from './icon.service';
import { SnackbarService } from './snackbar.service';
import { UiFormlyService } from './ui-formly.service';

export const SHARED_SERVICES = [IconService, UiFormlyService, SnackbarService];

export * from './icon.service';
export * from './snackbar.service';
export * from './ui-formly.service';
