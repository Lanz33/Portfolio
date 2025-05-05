import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  skills: string[];
  github: string;
  live: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  @ViewChildren('portfolioItem') portfolioItems!: QueryList<ElementRef>;
  projects: Project[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Project[]>('assets/projects.json').subscribe(data => {
      this.projects = data;
    });
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  /**
   * Richtet den Intersection Observer ein, um Elemente zu animieren,
   * wenn sie im Viewport sichtbar werden
   */
  setupIntersectionObserver(): void {
    const options = {
      root: null, // Viewport als Referenz verwenden
      rootMargin: '0px',
      threshold: 0.1 // 10% des Elements muss sichtbar sein
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: Observer entfernen nach der Animation
          // observer.unobserve(entry.target);
        }
      });
    }, options);

    // Finde alle Elemente mit der Klasse 'auto-show' und beobachte sie
    setTimeout(() => {
      const elements = document.querySelectorAll('.auto-show');
      elements.forEach(element => observer.observe(element));
    }, 100);
  }
}
