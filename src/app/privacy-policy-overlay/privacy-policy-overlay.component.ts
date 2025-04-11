import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-privacy-policy-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy-policy-overlay.component.html',
  styleUrl: './privacy-policy-overlay.component.scss'
})
export class PrivacyPolicyOverlayComponent {
  @Input() isVisible = false;
  @Output() closed = new EventEmitter<void>();
  privacyPolicy: string = '';

  constructor(private http: HttpClient) {
    this.loadPrivacyPolicy();
  }

  private loadPrivacyPolicy() {
    this.http.get('assets/privacy-policy.html', { responseType: 'text' })
      .subscribe({
        next: (data) => {
          this.privacyPolicy = data;
        },
        error: (error) => {
          console.error('Fehler beim Laden der Datenschutzerklärung:', error);
        }
      });
  }

  close() {
    this.isVisible = false;
    this.closed.emit();
  }
}
