import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../../core/services/scroll.service';
import { PORTFOLIO_DATA } from '../../../core/data/portfolio.data';
import { Profile } from '../../../core/models/portfolio.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  readonly scrollService = inject(ScrollService);
  readonly profile: Profile = PORTFOLIO_DATA.profile;
  readonly currentYear = 2026;

  scrollTo(id: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.scrollService.scrollTo(id);
  }
}

