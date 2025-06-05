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
  isLoading: boolean = true;
  private animatedElementsList: HTMLElement[] = [];

  constructor(private http: HttpClient, private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  private loadProjects(retryCount: number = 3): void {
    this.isLoading = true;
    this.http.get<Project[]>('assets/projects.json').subscribe({
      next: (data) => {
        this.projects = data.map((project, index) => ({
          ...project,
          descriptionKey: `projects.description${index + 1}`
        }));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        if (retryCount > 0) {
          setTimeout(() => {
            this.loadProjects(retryCount - 1);
          }, 1000);
        }
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animatedElementsList = Array.from(document.querySelectorAll('.animate-on-scroll, .portfolio-header'));
      this.checkElementsVisibility();
    }, 100);
  }

  ngOnDestroy(): void {
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
