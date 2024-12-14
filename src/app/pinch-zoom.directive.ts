import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';
import * as Hammer from 'hammerjs';
@Directive({
  selector: '[appPinch]',
  standalone: true,
})
export class PinchZoomDirective {
  private transform: any = {
    translate: { x: 0, y: 0 },
    scale: 1,
    angle: 0,
    rx: 0,
    ry: 0,
    rz: 0,
  };
  private initScale: number = 1;
  private ticking: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {

    console.log('adfafasfafadf')
    this.resetElement();
    this.initializeHammer();
  }

  private initializeHammer() {
    const hammerManager = new Hammer.Manager(this.el.nativeElement);

    // Add pinch gesture recognizer
    hammerManager.add(new Hammer.Pinch({ threshold: 0 }));

    // Bind pinch events
    hammerManager.on('pinchstart pinchmove', (ev: HammerInput) => this.onPinch(ev));
    hammerManager.on('pinchend', () => this.resetElement());
  }

  private resetElement() {
    this.el.nativeElement.classList.add('animate');
    this.transform = {
      translate: {
        x: 0,
        y: 0,
      },
      scale: 1,
      angle: 0,
      rx: 0,
      ry: 0,
      rz: 0,
    };

    this.requestElementUpdate();
  }

  private onPinch(ev: HammerInput) {
    // console.log('ev', ev.deltaX, ev.deltaY);
    // console.log('ev', (ev.srcEvent as PointerEvent).offsetX, (ev.srcEvent as PointerEvent).offsetY);
    // console.log('ev', ev.srcEvent);
    if (ev.type === 'pinchstart') {
      this.initScale = this.transform.scale || 1;
    }

    this.el.nativeElement.classList.remove('animate');
    this.transform.scale = this.initScale * ev.scale;
    this.transform.translate = {x: ev.deltaX, y: ev.deltaY}
    // this.transform.translate = {x: (ev.srcEvent as PointerEvent).offsetX, y: (ev.srcEvent as PointerEvent).offsetY}
    // this.transform.translate = {x: (ev.srcEvent as PointerEvent).screenX, y: (ev.srcEvent as PointerEvent).screenY}
    // console.log('this.transform.translate', this.transform.translate)

    this.requestElementUpdate();
  }

  private requestElementUpdate() {
    if (!this.ticking) {
      requestAnimationFrame(() => this.updateElementTransform());
      this.ticking = true;
    }
  }

  private updateElementTransform() {
    const value = [
      `translate3d(${this.transform.translate.x}px, ${this.transform.translate.y}px, 0)`,
      `scale(${this.transform.scale}, ${this.transform.scale})`,
      // `rotate3d(${this.transform.rx}, ${this.transform.ry}, ${this.transform.rz}, ${this.transform.angle}deg)`,
    ].join(' ');

    this.renderer.setStyle(this.el.nativeElement, 'transform', value);
    this.renderer.setStyle(this.el.nativeElement, 'webkitTransform', value);
    this.renderer.setStyle(this.el.nativeElement, 'mozTransform', value);

    this.ticking = false;
  }
}
