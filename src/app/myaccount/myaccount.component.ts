import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {

  title!: string;

  constructor(public route: ActivatedRoute, public titleService: Title) { }

  // if (!this.session.user) {
  //   this.router.navigate(['/login']);
  // }

  ngOnInit() {
    this.title = this.route.snapshot.data['title'];
    this.titleService.setTitle(this.title);
  }



}
