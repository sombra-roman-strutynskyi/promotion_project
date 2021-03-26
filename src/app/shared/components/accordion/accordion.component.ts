import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() hideToggle = false;
  @Input() open = false;
  @Input() buttonDisabled = false;
  @Input() buttonLabel: string;
  @Output() buttonClicked = new EventEmitter<void>();

  public onClick(): void {
    this.buttonClicked.emit();
  }
}
