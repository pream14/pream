import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { CardSpotlightDirective } from '../../shared/directives/card-spotlight.directive';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import { Project, Publication } from '../../core/models/portfolio.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, CardSpotlightDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class ProjectsComponent {
  readonly allProjects: Project[] = PORTFOLIO_DATA.projects;
  readonly publications: Publication[] = PORTFOLIO_DATA.publications;

  readonly selectedCategory = signal<string>('All');

  readonly categories = computed<string[]>(() => {
    const unique = Array.from(new Set(this.allProjects.map((p) => p.category)));
    return ['All', ...unique];
  });

  readonly filteredProjects = computed<Project[]>(() => {
    const active = this.selectedCategory();
    if (active === 'All') {
      return this.allProjects;
    }
    return this.allProjects.filter((p) => p.category === active);
  });

  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }
}
