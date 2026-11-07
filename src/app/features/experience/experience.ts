import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import { ExperienceItem } from '../../core/models/portfolio.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class ExperienceComponent {
  readonly experienceList: ExperienceItem[] = PORTFOLIO_DATA.experience;
}

