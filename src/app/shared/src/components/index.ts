import { UiBaseFormComponent, UiFormButtonsComponent } from './forms';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { UI_COMPONENTS } from './ui';

export const SHARED_COMPONENTS = [
  LayoutComponent,
  HeaderComponent,
  UiBaseFormComponent,
  UiFormButtonsComponent,
  ...UI_COMPONENTS,
];

export * from './layout/layout.component';
export * from './forms/index';
export * from './layout/header/header.component';
