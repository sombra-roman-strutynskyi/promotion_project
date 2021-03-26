import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Injector,
  Input,
  OnDestroy,
} from '@angular/core';

import { LoadingOverlayComponent } from '../components';

@Directive({ selector: '[loadingOverlay]' })
export class LoadingOverlayDirective implements OnDestroy {
  private bodyPortalHost: DomPortalOutlet;

  @Input()
  public set loadingOverlay(value: boolean) {
    const shouldSet = value && !this.bodyPortalHost?.hasAttached();

    if (shouldSet) {
      this.bodyPortalHost.attach(this.initPortal());
    } else {
      this.bodyPortalHost.detach();
    }
  }

  constructor(
    private elementRef: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {
    this.bodyPortalHost = new DomPortalOutlet(
      this.elementRef.nativeElement,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );
  }

  public ngOnDestroy(): void {
    if (this.bodyPortalHost) {
      this.bodyPortalHost.dispose();
    }
  }

  private initPortal(): ComponentPortal<LoadingOverlayComponent> {
    return new ComponentPortal(LoadingOverlayComponent);
  }
}
