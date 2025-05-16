import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, OnDestroy, HostListener } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-me',
  imports: [TranslateModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('animatedElement') animatedElements!: QueryList<ElementRef>;
  private animatedElementsList: HTMLElement[] = [];

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animatedElementsList = Array.from(document.querySelectorAll('.animate-on-scroll'));
      this.checkElementsVisibility();
    }, 100);
  }

  ngOnDestroy(): void {
    // Aufräumen des Event-Listeners beim Zerstören der Komponente
    window.removeEventListener('scroll', this.checkElementsVisibility);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.checkElementsVisibility();
  }

  private checkElementsVisibility(): void {
    if (!this.animatedElementsList.length) return;

    this.animatedElementsList.forEach(element => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isVisible = 
        rect.top < windowHeight * 0.9 && 
        rect.bottom > windowHeight * 0.1;
      
      if (isVisible) {
        element.classList.add('visible');
      } else {
        element.classList.remove('visible');
      }
    });
  }
}
