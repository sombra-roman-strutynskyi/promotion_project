import { FORM_COMPONENTS } from './form';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { UI_COMPONENTS } from './ui';

export const SHARED_COMPONENTS = [
  LayoutComponent,
  HeaderComponent,
  ...FORM_COMPONENTS,
  ...UI_COMPONENTS
];

export * from './layout/layout.component';
export * from './form/index';
export * from './layout/header/header.component';
