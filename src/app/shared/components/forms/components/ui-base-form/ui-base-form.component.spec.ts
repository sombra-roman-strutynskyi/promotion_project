import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentMock } from '@testing';
import { UiFormlyService } from '../../../../services/ui-formly.service';
import { UiBaseFormComponent } from './ui-base-form.component';

const providers = [
  {
    provide: UiFormlyService,
    useValue: {
      bindFieldsToFormState: jest.fn(),
    },
  },
];
describe('UiBaseFormComponent', () => {
  let component: UiBaseFormComponent;
  let fixture: ComponentFixture<UiBaseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UiBaseFormComponent,
        ComponentMock({
          selector: 'formly-form',
          inputs: ['form', 'model', 'fields', 'options'],
        }),
        ComponentMock({
          selector: 'ui-form-buttons',
          inputs: ['buttons', 'form', 'model'],
          outputs: ['action'],
        }),
        ComponentMock({
          selector: 'form',
          inputs: ['formGroup'],
        }),
      ],
      providers,
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiBaseFormComponent);
    component = fixture.debugElement.componentInstance;
    component.formOptions = {
      resetModel: jest.fn(),
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should submit form when call `handleAction` with type `submit`', () => {
    const spy = jest.spyOn(UiBaseFormComponent.prototype as any, 'submitForm');
    component.handleAction({ type: 'submit' });
    expect(spy).toHaveBeenCalled();
  });
  it('should cancel form when call `handleAction` with type `cancel`', () => {
    const spy = jest.spyOn(UiBaseFormComponent.prototype as any, 'cancel');
    component.handleAction({ type: 'cancel' });
    expect(spy).toHaveBeenCalled();
  });
  it('should reset form when call `handleAction` with type `reset`', () => {
    const spy = jest.spyOn(UiBaseFormComponent.prototype as any, 'resetForm');
    component.handleAction({ type: 'reset' });
    expect(spy).toHaveBeenCalled();
  });
});
