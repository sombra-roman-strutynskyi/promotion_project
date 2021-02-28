import { AccordionComponent } from './accordion/accordion.component';
import { DialogSuccessBlockComponent } from './dialog-success-block/dialog-success-block.component';
import {
  FORMLY_COMPONENTS,
  UiBaseFormComponent,
  UiFormButtonsComponent,
} from './forms';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';

export const SHARED_COMPONENTS = [
  UiBaseFormComponent,
  UiFormButtonsComponent,
  LoadingOverlayComponent,
  AccordionComponent,
  DialogSuccessBlockComponent,
  ...FORMLY_COMPONENTS,
];

export * from './loading-overlay/loading-overlay.component';
export * from './accordion/accordion.component';
export * from './dialog-success-block/dialog-success-block.component';
export * from './forms';
