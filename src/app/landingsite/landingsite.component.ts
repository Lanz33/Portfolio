import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { PortraitSectionComponent } from '../portrait-section/portrait-section.component';

@Component({
  selector: 'app-landingsite',
  imports: [HeaderComponent, PortraitSectionComponent],
  templateUrl: './landingsite.component.html',
  styleUrl: './landingsite.component.scss'
})
export class LandingsiteComponent {

}
