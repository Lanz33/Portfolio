import { Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsComponent } from './skills/skills.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    { path: '', component: LandingpageComponent }, 
    { path: 'about-me', component: AboutMeComponent }, 
    { path: 'skills', component: SkillsComponent },
    { path:'portfolio', component: PortfolioComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', redirectTo: '' } 
];
