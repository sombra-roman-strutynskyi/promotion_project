// tslint:disable: use-component-view-encapsulation
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';

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
      <ng-template matExpansionPanelContent>
        <div class="accordion__subheader" *ngIf="buttonLabel">
          <button
            class="accordion__button"
            mat-button
            color="primary"
            [disabled]="buttonDisabled"
            (click)="onClick()"
          >
            {{ buttonLabel }}
          </button>
        </div>

        <ng-content></ng-content>
      </ng-template>
    </mat-expansion-panel>
  `,
  styles: [
    `
      .accordion.mat-expansion-panel{
        box-sizing: border-box;
        margin: 15px 0;
      }
      .accordion .mat-expansion-panel-header.mat-expanded {
        border-bottom: 1px solid lightgrey;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        height: 48px;
      }

      .accordion__subheader {
        border-bottom: 1px solid #f7f3f3;
        margin: 0 -25px 20px;
      }
      .accordion__button.mat-button {
        padding: 0 5px;
        min-width:0;
        margin:0 20px;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AccordionComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() hideToggle = false;
  @Input() open = false;
  @Input() buttonDisabled = false;
  @Input() buttonLabel: string;
  @Output() buttonClicked = new EventEmitter();

  onClick() {
    this.buttonClicked.emit();
  }
}
