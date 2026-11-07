import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  Renderer2,
  Input
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  @Input() revealDelay = 0;

  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    if (!this.isBrowser) {
      // For SSR, render in visible state so content isn't hidden if JS fails or before hydration
      this.renderer.addClass(this.el.nativeElement, 'reveal-visible');
      return;
    }

    // Check if user prefers reduced motion
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      this.renderer.addClass(this.el.nativeElement, 'reveal-visible');
      return;
    }

    this.renderer.addClass(this.el.nativeElement, 'reveal-init');
    if (this.revealDelay > 0) {
      this.renderer.setStyle(this.el.nativeElement, 'transition-delay', `${this.revealDelay}ms`);
    }

    const options: IntersectionObserverInit = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'reveal-visible');
          this.observer?.unobserve(entry.target);
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

