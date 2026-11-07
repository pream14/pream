import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  templateUrl: './section-header.html',
  styleUrl: './section-header.css'
})
export class SectionHeaderComponent {
  @Input({ required: true }) title = '';
  @Input() badge = '';
  @Input() subtitle = '';
  @Input() centered = true;
}

