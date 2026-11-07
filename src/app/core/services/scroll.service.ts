import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly activeSection = signal<string>('hero');

  private sectionIds: string[] = [
    'hero',
    'about',
    'skills',
    'projects',
    'experience',
    'education',
    'contact'
  ];

  private isSmoothScrolling = false;
  private smoothScrollTimeout: any = null;
  private rafId: number | null = null;
  private scrollListener: (() => void) | null = null;
  private resizeListener: (() => void) | null = null;
  private mutationObserver: MutationObserver | null = null;

  /**
   * Smoothly scrolls to a target section by ID with navbar offset compensation
   */
  scrollTo(sectionId: string): void {
    if (!this.isBrowser) {
      return;
    }

    const element = this.document.getElementById(sectionId);
    if (!element) {
      return;
    }

    // Immediately reflect active section in UI on click
    this.activeSection.set(sectionId);
    this.isSmoothScrolling = true;

    if (this.smoothScrollTimeout) {
      clearTimeout(this.smoothScrollTimeout);
    }
    this.smoothScrollTimeout = setTimeout(() => {
      this.isSmoothScrolling = false;
      this.checkActiveSection();
    }, 800);

    const navbarOffset = 72;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = Math.max(0, elementPosition - navbarOffset);

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  /**
   * Initializes real-time scroll spying across all sections,
   * fully supporting deferred components (@defer) and dynamic rendering.
   */
  initSpy(sectionIds?: string[]): void {
    if (!this.isBrowser) {
      return;
    }

    if (sectionIds && sectionIds.length > 0) {
      this.sectionIds = [...sectionIds];
    }

    // Clean up any previous listeners
    this.destroy();

    // Throttled scroll handler using requestAnimationFrame
    this.scrollListener = () => {
      if (this.rafId !== null) {
        return;
      }
      this.rafId = window.requestAnimationFrame(() => {
        this.checkActiveSection();
        this.rafId = null;
      });
    };

    this.resizeListener = () => {
      this.checkActiveSection();
    };

    window.addEventListener('scroll', this.scrollListener, { passive: true });
    window.addEventListener('resize', this.resizeListener, { passive: true });

    // MutationObserver to immediately detect when @defer renders deferred sections
    if (typeof MutationObserver !== 'undefined') {
      this.mutationObserver = new MutationObserver(() => {
        this.checkActiveSection();
      });
      this.mutationObserver.observe(this.document.body, {
        childList: true,
        subtree: true
      });
    }

    // Initial check
    this.checkActiveSection();
  }

  /**
   * Evaluates the current scroll position and updates activeSection signal
   */
  private checkActiveSection(): void {
    if (!this.isBrowser || this.isSmoothScrolling) {
      return;
    }

    const scrollY = window.scrollY || window.pageYOffset || 0;
    const windowHeight = window.innerHeight;
    const docHeight = this.document.documentElement.scrollHeight;

    // 1. Bottom of page threshold: activate last section (contact)
    if (windowHeight + scrollY >= docHeight - 60) {
      const lastId = this.sectionIds[this.sectionIds.length - 1];
      if (this.activeSection() !== lastId) {
        this.activeSection.set(lastId);
      }
      return;
    }

    // 2. Detection line: 160px from top of viewport (just below sticky navbar)
    const triggerY = scrollY + 160;
    let currentId = this.sectionIds[0];

    // Scan backwards from bottom to top
    for (let i = this.sectionIds.length - 1; i >= 0; i--) {
      const id = this.sectionIds[i];
      const el = this.document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + scrollY;
        if (triggerY >= top) {
          currentId = id;
          break;
        }
      }
    }

    if (this.activeSection() !== currentId) {
      this.activeSection.set(currentId);
    }
  }

  destroy(): void {
    if (!this.isBrowser) {
      return;
    }

    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
      this.scrollListener = null;
    }

    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
      this.resizeListener = null;
    }

    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }

    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    if (this.smoothScrollTimeout) {
      clearTimeout(this.smoothScrollTimeout);
      this.smoothScrollTimeout = null;
    }
  }
}
