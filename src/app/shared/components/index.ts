import { AccordionComponent } from './accordion/accordion.component';
import { DialogSuccessBlockComponent } from './dialog-success-block/dialog-success-block.component';
import {
  FORMLY_COMPONENTS,
  UiBaseFormComponent,
  UiFormButtonsComponent,
} from './forms';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';

export const SHARED_COMPONENTS = [
  LayoutComponent,
  HeaderComponent,
  UiBaseFormComponent,
  UiFormButtonsComponent,
  LoadingOverlayComponent,
  AccordionComponent,
  DialogSuccessBlockComponent,
  ...FORMLY_COMPONENTS,
];

export * from './layout/layout.component';
export * from './layout/header/header.component';
export * from './loading-overlay/loading-overlay.component';
export * from './accordion/accordion.component';
export * from './dialog-success-block/dialog-success-block.component';
export * from './forms';
