import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.scss']
})
export class AboutmeComponent implements OnInit {

  title!: string;

  constructor(private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.data['title'];
    this.titleService.setTitle(this.title);
  }

}
