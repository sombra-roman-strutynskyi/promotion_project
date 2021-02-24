import { async, ComponentFixture } from '@angular/core/testing';
import { UiFormButtonsComponent } from './ui-form-buttons.component';

const providers = [];

describe('UiFormButtonsComponent', () => {
  let component: UiFormButtonsComponent;
  // tslint:disable-next-line: prefer-const
  let fixture: ComponentFixture<UiFormButtonsComponent>;

  beforeEach(() => {
    // fixture = createComponent<UiFormButtonsComponent>(
    //   UiFormButtonsComponent,
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
