import { Component, OnInit, OnDestroy, inject, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { FooterComponent } from './shared/components/footer/footer';
import { HeroComponent } from './features/hero/hero';
import { AboutComponent } from './features/about/about';
import { SkillsComponent } from './features/skills/skills';
import { ProjectsComponent } from './features/projects/projects';
import { ExperienceComponent } from './features/experience/experience';
import { EducationComponent } from './features/education/education';
import { ContactComponent } from './features/contact/contact';
import { MetaService } from './core/services/meta.service';
import { ScrollService } from './core/services/scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    EducationComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  private readonly metaService = inject(MetaService);
  private readonly scrollService = inject(ScrollService);

  private readonly sectionIds = [
    'hero',
    'about',
    'skills',
    'projects',
    'experience',
    'education',
    'contact'
  ];

  constructor() {
    afterNextRender(() => {
      this.scrollService.initSpy(this.sectionIds);
    });
  }

  ngOnInit(): void {
    this.metaService.init();
  }

  ngOnDestroy(): void {
    this.scrollService.destroy();
  }
}
