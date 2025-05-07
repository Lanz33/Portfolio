import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface Skill {
  title: string;
  pfad: string;
}
@Component({
  selector: 'app-skills',
  imports: [CommonModule, HttpClientModule, TranslateModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];

  constructor(private translate: TranslateService, private http: HttpClient) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit() {
    this.http.get<Skill[]>('assets/skills.json').subscribe(data => {
      this.skills = data;
    });
  }
}
