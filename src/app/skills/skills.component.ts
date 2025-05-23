import { Component, OnInit, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface Skill {
  title: string;
  pfad: string;
}
@Component({
  selector: 'app-skills',
  imports: [CommonModule, TranslateModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit, AfterViewInit, OnDestroy {
  skills: Skill[] = [];
  isLoading: boolean = true;
  private animatedElementsList: HTMLElement[] = [];

  constructor(private translate: TranslateService, private http: HttpClient) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit() {
    this.loadSkills();
  }

  private loadSkills(retryCount: number = 3): void {
    this.isLoading = true;
    this.http.get<Skill[]>('assets/skills.json').subscribe({
      next: (data) => {
        this.skills = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading skills:', error);
        if (retryCount > 0) {
          setTimeout(() => {
            this.loadSkills(retryCount - 1);
          }, 1000);
        }
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animatedElementsList = Array.from(document.querySelectorAll('.animate-on-scroll, .skill-header'));
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
        rect.bottom > windowHeight * 0.2;
      
      if (isVisible) {
        element.classList.add('visible');
      } else {
        element.classList.remove('visible');
      }
    });
  }
}
