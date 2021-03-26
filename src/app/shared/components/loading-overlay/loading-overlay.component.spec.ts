import { async, ComponentFixture } from '@angular/core/testing';
import { createComponent } from '@testing';
import { LoadingOverlayComponent } from './loading-overlay.component';

const providers = [];
const imports = [];

describe('LoadingOverlayComponent', () => {
  let component: LoadingOverlayComponent;
  let fixture: ComponentFixture<LoadingOverlayComponent>;

  beforeEach(() => {
    fixture = createComponent<LoadingOverlayComponent>(
      LoadingOverlayComponent,
      providers,
      imports,
      true
    );
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
