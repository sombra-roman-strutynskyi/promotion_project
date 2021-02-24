import { FileValueAccessorDirective } from './file-value-accessor.directive';
import { LoadingOverlayDirective } from './loading-overlay.directive';

export const SHARED_DIRECTIVES = [
  LoadingOverlayDirective,
  FileValueAccessorDirective,
];
export * from './loading-overlay.directive';
export * from './file-value-accessor.directive';
