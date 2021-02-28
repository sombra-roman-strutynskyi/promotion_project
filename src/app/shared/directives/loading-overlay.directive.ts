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

@Directive({ selector: '[loadingOverlay]' })
export class LoadingOverlayDirective implements OnInit, OnDestroy {
  _loadingOverlay: boolean;

  private bodyPortalHost: DomPortalOutlet;

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

  @HostBinding('style.position')
  public position: string;

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

  public ngOnInit(): void {
    this.position = 'relative';
  }

  public ngOnDestroy(): void {
    if (this.bodyPortalHost) {
      this.bodyPortalHost.dispose();
    }
  }

  initPortal() {
    return new ComponentPortal(LoadingOverlayComponent);
  }
}
