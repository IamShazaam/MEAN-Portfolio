import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill-languages',
  templateUrl: './skill-languages.component.html',
  styleUrls: ['./skill-languages.component.scss']
})
export class SkillLanguagesComponent implements OnInit {

  public frameworks = [
    { id: 1, name: 'Angular', srC: 'assets/angular.png', level: 10, score: '75%' },
    { id: 2, name: 'Vue', srC: 'assets/vue.png', level: 10, score: '10%' },
    { id: 3, name: 'Laravel', srC: 'assets/laravel.png', level: 10, score: '50%' }
  ]

  public languages = [
    { id: 1, name: 'JavaScript', srC: 'assets/javascript.png', level: 10, score: '75%' },
    { id: 2, name: 'TypeScript', srC: 'assets/typescript.png', level: 10, score: '50%' },
    { id: 3, name: 'PhP', srC: 'assets/php.png', level: 10, score: '75%' },
    { id: 4, name: 'MySQL', srC: 'assets/mysql.png', level: 10, score: '80%' },
    { id: 5, name: 'MongoDB', srC: 'assets/mongodb.png', level: 10, score: '90%' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
