import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { PORTFOLIO_DATA, FORMSPREE_ENDPOINT } from '../../core/data/portfolio.data';
import { Profile } from '../../core/models/portfolio.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollRevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly profile: Profile = PORTFOLIO_DATA.profile;
  readonly formspreeUrl = FORMSPREE_ENDPOINT;

  // Form Model
  name = '';
  email = '';
  subject = 'Job Opportunity';
  message = '';

  // Topics for quick selection
  readonly topics: string[] = [
    'Job Opportunity',
    'GenAI / LLM Project',
    'Backend Architecture',
    'General Inquiry'
  ];
  selectedTopic = signal<string>('Job Opportunity');
  copiedEmail = signal<boolean>(false);

  // Form State
  isSubmitting = signal<boolean>(false);
  isSuccess = signal<boolean>(false);
  errorMessage = signal<string>('');

  selectTopic(topic: string): void {
    this.selectedTopic.set(topic);
    this.subject = topic;
  }

  async copyEmail(): Promise<void> {
    if (!this.isBrowser) {
      return;
    }
    try {
      await navigator.clipboard.writeText('pream20041214@gmail.com');
      this.copiedEmail.set(true);
      setTimeout(() => this.copiedEmail.set(false), 2400);
    } catch {
      // Fallback if clipboard API restricted
    }
  }

  async onSubmit(): Promise<void> {
    if (!this.name || !this.email || !this.message) {
      this.errorMessage.set('Please fill out all required fields.');
      return;
    }

    // SSR safety check
    if (!this.isBrowser) {
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');
    this.isSuccess.set(false);

    try {
      // Check if endpoint is still default placeholder
      if (this.formspreeUrl.includes('YOUR_FORM_ID')) {
        // Simulate successful submission for demonstration if user hasn't added their key yet
        await new Promise((resolve) => setTimeout(resolve, 800));
        this.isSuccess.set(true);
        this.resetForm();
        return;
      }

      const response = await fetch(this.formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          subject: this.subject,
          message: this.message
        })
      });

      if (response.ok) {
        this.isSuccess.set(true);
        this.resetForm();
      } else {
        const data = await response.json().catch(() => ({}));
        this.errorMessage.set(
          data?.errors?.map((e: { message: string }) => e.message).join(', ') ||
            'Failed to send message. Please try again or reach out via email directly.'
        );
      }
    } catch {
      this.errorMessage.set('A network error occurred. Please try again or send an email directly.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private resetForm(): void {
    this.name = '';
    this.email = '';
    this.subject = this.selectedTopic();
    this.message = '';
  }
}

