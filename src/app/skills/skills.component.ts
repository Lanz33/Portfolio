import { Component, OnInit, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface Skill {
  title: string;
  pfad: string;
}

interface PopupSkill {
  name: string;
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
  popupSkills: PopupSkill[] = [];
  private animatedElementsList: HTMLElement[] = [];
  isPopupVisible = false;

  constructor(private translate: TranslateService, private http: HttpClient) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit() {
    this.http.get<Skill[]>('assets/skills.json').subscribe(data => {
      this.skills = data;
    });
    this.http.get<PopupSkill[]>('assets/popup.json').subscribe(data => {
      this.popupSkills = data;
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

  showPopup(event: MouseEvent, isLast: boolean): void {
    if (isLast) {
      this.isPopupVisible = true;
    }
  }

  hidePopup(): void {
    this.isPopupVisible = false;
  }
}
