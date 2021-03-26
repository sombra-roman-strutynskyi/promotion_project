import { async, ComponentFixture } from '@angular/core/testing';
import { createComponent } from '@testing';
import { UiFormButtonsComponent } from './ui-form-buttons.component';

describe('UiFormButtonsComponent', () => {
  let component: UiFormButtonsComponent;
  let fixture: ComponentFixture<UiFormButtonsComponent>;

  beforeEach(() => {
    fixture = createComponent<UiFormButtonsComponent>(
      UiFormButtonsComponent,
      [],
      [],
      true
    );
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should click with type but without payload and handler', (done) => {
    component.action.subscribe((data) => {
      expect(data).toEqual({ type: 'type', payload: {} });
      done();
    });
    component.click('type');
  });
  it('should click with type and payload but without handler', (done) => {
    component.action.subscribe((data) => {
      expect(data).toEqual({ type: 'type', payload: { test: 'test' } });
      done();
    });
    component.click('type', { test: 'test' });
  });
  it('should click with type, payload and handler', (done) => {
    component.action.subscribe((data) => {
      expect(data).toEqual({ type: 'type', payload: { test: 'test' } });
      done();
    });
    component.click('type', { test: 'test' }, () => 'test');
  });
});
