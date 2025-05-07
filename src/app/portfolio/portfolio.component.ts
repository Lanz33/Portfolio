import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
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
export class PortfolioComponent implements OnInit {
  @ViewChildren('portfolioItem') portfolioItems!: QueryList<ElementRef>;
  projects: Project[] = [];

  constructor(private http: HttpClient, private translate: TranslateService) {}

  ngOnInit(): void {
    this.http.get<Project[]>('assets/projects.json').subscribe(data => {
      this.projects = data.map((project, index) => ({
        ...project,
        descriptionKey: `projects.description${index + 1}`
      }));
    });
  }
}
