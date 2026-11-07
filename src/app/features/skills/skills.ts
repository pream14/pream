import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { CardSpotlightDirective } from '../../shared/directives/card-spotlight.directive';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import { SkillCategory, Profile } from '../../core/models/portfolio.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, CardSpotlightDirective],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class SkillsComponent {
  readonly skillCategories: SkillCategory[] = PORTFOLIO_DATA.skills;
  readonly profile: Profile = PORTFOLIO_DATA.profile;
}

