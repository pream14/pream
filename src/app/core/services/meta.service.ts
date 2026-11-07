import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { PORTFOLIO_DATA } from '../data/portfolio.data';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  init(): void {
    const { name, title, company, bio } = PORTFOLIO_DATA.profile;
    const pageTitle = `${name} | ${title} at ${company}`;

    this.title.setTitle(pageTitle);

    this.meta.updateTag({ name: 'description', content: bio });
    this.meta.updateTag({ name: 'author', content: name });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Pream, Digital Specialist Engineer, Infosys, PSG College of Technology, Java, Spring Boot, Angular, Python, Flask, React Native, Generative AI'
    });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: bio });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: bio });
  }
}

