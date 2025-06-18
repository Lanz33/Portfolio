import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { TranslateService, TranslateModule } from "@ngx-translate/core";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MobileMenuComponent, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  name: string = 'Christian';
  scrambledName: string[] = [];
  isMenuOpen: boolean = false;
  currentLanguage: string = 'en'; 
  ngOnInit(): void {
    this.scrambledName = this.name.split(''); 
    this.startScrambling();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : ''; 
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  startScrambling(): void {
    const letters = '0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    const scrambleInterval = () => Math.random() * (8000 - 3000) + 300; 

    const scrambleLetter = (initialIndex?: number) => {
      const index = initialIndex !== undefined ? initialIndex : Math.floor(Math.random() * this.name.length);
      const originalLetter = this.name[index];
      let scrambleCount = 0;

      const scrambleStep = () => {
        if (scrambleCount < 10) {
          this.scrambledName[index] = letters[Math.floor(Math.random() * letters.length)]; 
          scrambleCount++;
          setTimeout(scrambleStep, 70);
        } else {
          this.scrambledName[index] = originalLetter;
          if (initialIndex === undefined) {
            setTimeout(scrambleLetter, scrambleInterval());
            
            if (index < this.name.length - 1) {
              setTimeout(() => scrambleLetter(index + 1), 500);
            }
          }
        }
      };

      scrambleStep();
    };

    scrambleLetter();
  }

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'en' ? 'de' : 'en';
    this.translate.use(this.currentLanguage);
  }

  onLanguageChange(newLanguage: string) {
    this.currentLanguage = newLanguage;
    this.translate.use(this.currentLanguage);
  }
}