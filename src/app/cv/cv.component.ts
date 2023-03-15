import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {

  title!: string;

  constructor(public route: ActivatedRoute, public titleService: Title) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.data['title'];
    this.titleService.setTitle(this.title);
  }

}
