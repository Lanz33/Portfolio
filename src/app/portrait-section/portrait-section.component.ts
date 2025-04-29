import { Component } from '@angular/core';

@Component({
  selector: 'app-portrait-section',
  imports: [],
  templateUrl: './portrait-section.component.html',
  styleUrl: './portrait-section.component.scss'
})
export class PortraitSectionComponent {
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
