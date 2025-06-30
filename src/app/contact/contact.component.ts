import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { PrivacyPolicyOverlayComponent } from '../privacy-policy-overlay/privacy-policy-overlay.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  imports: [
    FormsModule, 
    MatCheckboxModule, 
    MatInputModule, 
    CommonModule, 
    ReactiveFormsModule, 
    MatDialogModule,
    PrivacyPolicyOverlayComponent,
    TranslateModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  checked = false;
  indeterminate = false;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  labelPosition: 'before' | 'after' = 'after';
  isDisabled = false;
  submitted = false;
  showPrivacyPolicy = false;
  private animatedElementsList: HTMLElement[] = [];

  http = inject(HttpClient);
  contactData = {
    name: '',
    email: '',
    message: ''
  }

  mailTest = false;

  constructor(private translate: TranslateService) {
      this.translate.addLangs(['de', 'en']);
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animatedElementsList = Array.from(document.querySelectorAll('.animate-on-scroll, .contact-header'));
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
        rect.top < windowHeight * 0.9 && 
        rect.bottom > windowHeight * 0.1;
      
      if (isVisible) {
        element.classList.add('visible');
      } else {
        element.classList.remove('visible');
      }
    });
  }

  post = {
    endPoint: 'https://christian-fischer.org/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            ngForm.resetForm();
            this.submitted = true;
            setTimeout(() => {
              this.submitted = false;
            }, 3000); // Bestätigung verschwindet nach 3 Sekunden
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      ngForm.resetForm();
      this.submitted = true;
      setTimeout(() => {
        this.submitted = false;
      }, 3000);
    }
  }

  openPrivacyPolicy() {
    this.showPrivacyPolicy = true;
  }

  onPrivacyPolicyClosed() {
    this.showPrivacyPolicy = false;
  }

  getLabelPosition(): 'before' | 'after' {
    return this.labelPosition;
  }

  getIsDisabled(): boolean {
    return this.isDisabled;
  }
}
