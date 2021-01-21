import { async, ComponentFixture } from '@angular/core/testing';

import { UiBaseFormComponent } from './ui-base-form.component';

const providers = [];
const imports = [];

describe('UiBaseFormComponent', () => {
  let component: UiBaseFormComponent;
  let fixture: ComponentFixture<UiBaseFormComponent>;

  beforeEach(() => {
    // fixture = createComponent<UiBaseFormComponent>(
    //   UiBaseFormComponent,
    //   providers,
    //   imports,
    //   true
    // );
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
