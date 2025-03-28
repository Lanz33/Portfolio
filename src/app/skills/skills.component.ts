import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Skill {
  title: string;
  pfad: string;
}
@Component({
  selector: 'app-skills',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Skill[]>('assets/skills.json').subscribe(data => {
      this.skills = data;
    });
  }
}
