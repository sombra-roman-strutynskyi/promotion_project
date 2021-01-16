import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-accordion',
  template: `
    <mat-expansion-panel
      class="accordion"
      [hideToggle]="hideToggle"
      [expanded]="open"
    >
      <mat-expansion-panel-header *ngIf="title || description">
        <mat-panel-title *ngIf="title"> {{ title }} </mat-panel-title>
        <mat-panel-description *ngIf="description">
          {{ description }}
        </mat-panel-description>
      </mat-expansion-panel-header>
      <div class="container-fluid">
        <ng-content></ng-content>
      </div>
    </mat-expansion-panel>
  `,
  styles: [
    `
      .accordion {
        margin: 15px 0;
      }
    `,
  ],
})
export class AccordionComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() hideToggle = false;
  @Input() open = false;
}
