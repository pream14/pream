import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

export type ThemeMode = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly storageKey = 'portfolio-theme-v2';
  readonly currentTheme = signal<ThemeMode>('light');

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      const savedTheme = localStorage.getItem(this.storageKey) as ThemeMode | null;

      if (savedTheme === 'light' || savedTheme === 'dark') {
        this.applyTheme(savedTheme, false);
      } else {
        // Light theme by default
        this.applyTheme('light', false);
      }
    } catch {
      this.applyTheme('light', false);
    }
  }

  toggleTheme(): void {
    const nextTheme: ThemeMode = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.applyTheme(nextTheme, true);
  }

  setTheme(theme: ThemeMode): void {
    this.applyTheme(theme, true);
  }

  private applyTheme(theme: ThemeMode, persist: boolean): void {
    this.currentTheme.set(theme);

    if (this.isBrowser) {
      if (this.document?.documentElement) {
        this.document.documentElement.setAttribute('data-theme', theme);
      }
      if (persist) {
        try {
          localStorage.setItem(this.storageKey, theme);
        } catch {
          // Ignore localStorage errors (e.g. private mode quota)
        }
      }
    }
  }
}

