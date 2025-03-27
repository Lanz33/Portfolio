import { Routes } from '@angular/router';
import { AppComponent } from './app.component'; // Importiere die AppComponent
import { AboutMeComponent } from './about-me/about-me.component';

export const routes: Routes = [
    { path: '', component: AppComponent }, 
    { path: 'about-me', component: AboutMeComponent }, 
    { path: '**', redirectTo: '' } 
];
