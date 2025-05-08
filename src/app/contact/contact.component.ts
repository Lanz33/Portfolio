import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, AfterViewInit } from '@angular/core';
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
export class ContactComponent implements AfterViewInit {
  checked = false;
  indeterminate = false;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  labelPosition: 'before' | 'after' = 'after';
  isDisabled = false;
  submitted = false;
  showPrivacyPolicy = false;

  http = inject(HttpClient);
  contactData = {
    name: '',
    email: '',
    message: ''
  }

  mailTest = true;

  constructor(private translate: TranslateService) {
      this.translate.addLangs(['de', 'en']);
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: [0, 0.1, 0.9, 1.0]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          entry.target.classList.add('visible');
        } else if (!entry.isIntersecting || entry.intersectionRatio < 0.1) {
          entry.target.classList.remove('visible');
        }
      });
    }, options);

    setTimeout(() => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        observer.observe(element);
      });
    }, 100);
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
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      ngForm.resetForm();
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
