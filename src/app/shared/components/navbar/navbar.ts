import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { ScrollService } from '../../../core/services/scroll.service';
import { PORTFOLIO_DATA } from '../../../core/data/portfolio.data';
import { NavItem } from '../../../core/models/portfolio.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  readonly themeService = inject(ThemeService);
  readonly scrollService = inject(ScrollService);

  readonly navItems: NavItem[] = PORTFOLIO_DATA.navItems;
  readonly isMobileMenuOpen = signal<boolean>(false);
  readonly isScrolled = signal<boolean>(false);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (typeof window !== 'undefined') {
      this.isScrolled.set(window.scrollY > 20);
    }
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.isMobileMenuOpen()) {
      this.isMobileMenuOpen.set(false);
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  navigateTo(sectionId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.scrollService.scrollTo(sectionId);
    this.isMobileMenuOpen.set(false);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}

