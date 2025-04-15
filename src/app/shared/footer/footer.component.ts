import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpressumOverlayComponent } from '../../impressum-overlay/impressum-overlay.component';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, ImpressumOverlayComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  showImpressum = false;

  openImpressum() {
    this.showImpressum = true;
  }

  onImpressumClosed() {
    this.showImpressum = false;
  }
}
