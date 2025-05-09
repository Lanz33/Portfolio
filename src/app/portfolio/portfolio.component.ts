import { AfterViewInit, Component, ElementRef, OnInit, OnDestroy, QueryList, ViewChildren, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


interface Project {
  title: string;
  description: string;
  descriptionKey: string;
  image: string;
  link: string;
  skills: string[];
  github: string;
  live: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, TranslateModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('portfolioItem') portfolioItems!: QueryList<ElementRef>;
  projects: Project[] = [];
  private animatedElementsList: HTMLElement[] = [];

  constructor(private http: HttpClient, private translate: TranslateService) {}

  ngOnInit(): void {
    this.http.get<Project[]>('assets/projects.json').subscribe(data => {
      this.projects = data.map((project, index) => ({
        ...project,
        descriptionKey: `projects.description${index + 1}`
      }));
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animatedElementsList = Array.from(document.querySelectorAll('.animate-on-scroll, .portfolio-header'));
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
      
      // Element ist sichtbar, wenn es sich im sichtbaren Bereich des Fensters befindet
      // Mit einem kleinen Puffer, damit Elemente früher sichtbar werden
      const isVisible = 
        rect.top < windowHeight * 0.8 && 
        rect.bottom > windowHeight * 0.2;
      
      if (isVisible) {
        element.classList.add('visible');
      } else {
        element.classList.remove('visible');
      }
    });
  }
}
