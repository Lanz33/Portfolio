import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, model, inject } from '@angular/core';
import { FormControl, FormsModule, NgForm, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, MatCheckboxModule, MatInputModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ContactComponent {
  checked = false;
  indeterminate = false;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  labelPosition: 'before' | 'after' = 'after';
  isDisabled = false;
  submitted = false;

  http=inject(HttpClient);
  contactData ={
    name: '',
    email: '',
    message: ''
  }

  mailTest = true;

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

  getLabelPosition(): 'before' | 'after' {
    return this.labelPosition;
  }

  getIsDisabled(): boolean {
    return this.isDisabled;
  }
}
