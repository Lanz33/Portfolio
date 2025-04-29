import { Component, EventEmitter, Input, Output, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mobile-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss'
})
export class MobileMenuComponent {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  
  currentLanguage: string = 'en'; // Standard Sprache

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (!this.isOpen) return;
    const target = event.target as HTMLElement;
    const burgerIcon = document.querySelector('.burger-icon');
    
    if (burgerIcon && (burgerIcon === target || burgerIcon.contains(target))) {
      return; 
    }
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  closeMenu() {
    this.close.emit();
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.closeMenu();
    }
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'en' ? 'de' : 'en';
  }
}
