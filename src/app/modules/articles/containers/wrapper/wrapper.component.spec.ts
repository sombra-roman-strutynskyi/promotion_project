import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { ComponentMock, TestingModule } from '@testing';
import { WrapperComponent } from './wrapper.component';

describe('WrapperComponent', () => {
  let component: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, RouterTestingModule],
      declarations: [
        WrapperComponent,
        ComponentMock({ selector: 'widget-crypto-currency' }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
