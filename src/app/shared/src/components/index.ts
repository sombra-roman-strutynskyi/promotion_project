import {
  FORMLY_COMPONENTS,
  UiBaseFormComponent,
  UiFormButtonsComponent,
} from './forms';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { UI_COMPONENTS } from './ui';

export const SHARED_COMPONENTS = [
  LayoutComponent,
  HeaderComponent,
  UiBaseFormComponent,
  UiFormButtonsComponent,
  LoadingOverlayComponent,
  ...UI_COMPONENTS,
  ...FORMLY_COMPONENTS,
];

export * from './layout/layout.component';
export * from './forms/index';
export * from './layout/header/header.component';
export * from './loading-overlay/loading-overlay.component';
