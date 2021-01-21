import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  HostBinding,
  Injector,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { LoadingOverlayComponent } from '../components';
/**
 * The loadingOverlay UI Directive.
 * Provides a spinner overlay to demonstrate loading for async data.
 *
 * @example
 * <div [loadingOverlay]="true"></div>
 *
 */
@Directive({ selector: '[loadingOverlay]' })
export class LoadingOverlayDirective implements OnInit, OnDestroy {
  _loadingOverlay: boolean;
  /**
   * Reference to our portal host
   */
  private bodyPortalHost: DomPortalOutlet;

  /**
   * Define a setter to show/hide the loading overlay
   */
  @Input()
  public set loadingOverlay(value: boolean) {
    const shouldSet = value && !this.bodyPortalHost?.hasAttached();

    if (shouldSet) {
      this.bodyPortalHost.attach(this.initPortal());
    } else {
      this.bodyPortalHost.detach();
    }
    this._loadingOverlay = value;
  }
  public get loadingOverlay() {
    return this._loadingOverlay;
  }

  /**
   * Alias the position back onto the component as a style attribute
   */
  @HostBinding('style.position')
  public position: string;

  /**
   * Inject services
   */
  constructor(
    private elementRef: ElementRef,
    // private windowService: TsWindowService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {
    // Create the body portal host
    this.bodyPortalHost = new DomPortalOutlet(
      this.elementRef.nativeElement,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );
  }

  /**
   * Determine and set the needed position
   */
  public ngOnInit(): void {
    // Determine the CSS position of the element
    // const position = this.windowService.nativeWindow
    //   .getComputedStyle(this.elementRef.nativeElement)
    //   .getPropertyValue('position');

    // Set the position
    this.position = 'relative';
  }

  /**
   * Destroy the portal host if it exists
   */
  public ngOnDestroy(): void {
    if (this.bodyPortalHost) {
      this.bodyPortalHost.dispose();
    }
  }

  // /**
  //  * Return the correct position
  //  *
  //  * @param position The current position value
  //  * @return The correct position value
  //  */
  // private determinePosition(position: string): string {
  //   return position === 'relative' || position === 'absolute'
  //     ? position
  //     : 'relative';
  // }

  initPortal() {
    return new ComponentPortal(LoadingOverlayComponent);
  }
}
