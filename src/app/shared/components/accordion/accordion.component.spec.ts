import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentMock } from '@testing';

import { AccordionComponent } from './accordion.component';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccordionComponent,
        ComponentMock({
          selector: 'mat-expansion-panel',
          inputs: ['hideToggle', 'expanded'],
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click', (done) => {
    component.buttonClicked.subscribe((data) => {
      expect(data).toBe(undefined);
      done();
    });
    component.onClick();
  });
  afterEach(() => {
    fixture.destroy();
  });
});
