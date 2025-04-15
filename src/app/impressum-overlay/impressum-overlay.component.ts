import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-impressum-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './impressum-overlay.component.html',
  styleUrls: ['./impressum-overlay.component.scss']
})
export class ImpressumOverlayComponent {
  @Input() isVisible = false;
  @Output() closed = new EventEmitter<void>();
  impressumContent: string = '';

  constructor(private http: HttpClient) {
    this.loadImpressum();
  }

  private loadImpressum() {
    this.http.get('assets/impressum.html', { responseType: 'text' })
      .subscribe({
        next: (data) => {
          this.impressumContent = data;
        },
        error: (error) => {
          console.error('Fehler beim Laden des Impressums:', error);
        }
      });
  }

  close() {
    this.isVisible = false;
    this.closed.emit();
  }
}