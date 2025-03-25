import { Routes } from '@angular/router';
import { AppComponent } from './app.component'; // Importiere die AppComponent

export const routes: Routes = [
    { path: '', component: AppComponent }, // Verwende die AppComponent
    { path: '**', redirectTo: '' } // Leitet unbekannte Pfade zur Startseite um
];
