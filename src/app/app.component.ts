import { Component } from '@angular/core';
/* import { RouterOutlet } from '@angular/router'; */
import { PortraitSectionComponent } from './portrait-section/portrait-section.component';
import { HeaderComponent } from './shared/header/header.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsComponent } from './skills/skills.component';

@Component({
  selector: 'app-root',
  imports: [/* RouterOutlet, */ HeaderComponent, PortraitSectionComponent, AboutMeComponent, SkillsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Portfolio';
}
