import { FORM_COMPONENTS } from './form';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';

export const SHARED_COMPONENTS = [
  LayoutComponent,
  HeaderComponent,
  ...FORM_COMPONENTS,
];

export * from './layout/layout.component';
export * from './form/index';
export * from './layout/header/header.component';
