import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  PLATFORM_ID,
  Renderer2
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appCardSpotlight]',
  standalone: true
})
export class CardSpotlightDirective {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (!this.isBrowser) {
      return;
    }

    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.renderer.setStyle(this.el.nativeElement, '--spot-x', `${x}px`);
    this.renderer.setStyle(this.el.nativeElement, '--spot-y', `${y}px`);
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.isBrowser) {
      this.renderer.addClass(this.el.nativeElement, 'spotlight-active');
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.isBrowser) {
      this.renderer.removeClass(this.el.nativeElement, 'spotlight-active');
    }
  }
}

