import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-me',
  imports: [TranslateModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements AfterViewInit {
  @ViewChildren('animatedElement') animatedElements!: QueryList<ElementRef>;

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '-40% 0px -10% 0px', // Fügt einen Rand hinzu, damit Elemente früher ausgeblendet werden
      threshold: [0, 0.1, 0.9, 1.0]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          entry.target.classList.add('visible');
        } 
        // Wenn Element den Viewport verlässt
        else if (!entry.isIntersecting || entry.intersectionRatio < 0.1) {
          entry.target.classList.remove('visible');
        }
      });
    }, options);

    // Alle Elemente beobachten, die animiert werden sollen
    setTimeout(() => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        observer.observe(element);
      });
    }, 100);
  }
}
