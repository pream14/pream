import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import { EducationItem } from '../../core/models/portfolio.model';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './education.html',
  styleUrl: './education.css'
})
export class EducationComponent {
  readonly educationList: EducationItem[] = PORTFOLIO_DATA.education;
}

