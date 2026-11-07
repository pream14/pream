import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import { Profile } from '../../core/models/portfolio.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {
  readonly profile: Profile = PORTFOLIO_DATA.profile;
}

