import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  title!: string;

  constructor(public route: ActivatedRoute, public titleService: Title, private http: HttpClient) { }

  data = {
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    gender: '',
    carrier: ''
  };

  isPasswordTooLong: boolean = false;

  checkPasswordLength(): void {
    this.isPasswordTooLong = this.data.password.length > 10;
  }


  register(event: Event) {
    console.log('Register function called');
    event.preventDefault();



    this.http.post('http://localhost:3000/api/register', this.data).subscribe({
      next: () => alert('User registered successfully'),
      error: () => alert('Failed to register user')
    });
  }

  ngOnInit(): void {
    this.title = this.route.snapshot.data['title'];
    this.titleService.setTitle(this.title);
  }

}

