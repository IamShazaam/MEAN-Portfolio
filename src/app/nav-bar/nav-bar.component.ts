import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

  showMediaList: boolean = false;
  lis: string[] = ['PHP', 'JavaScript', 'TypeScript', 'Games'];
  email = '';
  password = '';
  loggedIn!: boolean;

  constructor(private router: Router,
              private renderer: Renderer2,
              private el: ElementRef,
              private http: HttpClient) {}

  ngOnInit(): void {

    // Check for current user session
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser && JSON.parse(currentUser).loggedIn) {
      this.loggedIn = true;
    }

    const overlay = this.el.nativeElement.querySelector('#overlay');
    const openModal = this.el.nativeElement.querySelectorAll('.open_modal');
    const close = this.el.nativeElement.querySelectorAll('.modal_close, #overlay');
    const modal = this.el.nativeElement.querySelector('.modal_div');

    openModal.forEach((button: HTMLElement) => {
      this.renderer.listen(button, 'click', (event) => {
        event.preventDefault();
        const div = button.getAttribute('href');
        this.renderer.setStyle(overlay, 'display', 'block');
        this.renderer.setStyle(modal, 'display', 'block');
        this.renderer.setStyle(modal, 'opacity', '1');
        this.renderer.setStyle(modal, 'top', '10%');
      });
    });

    close.forEach((button: HTMLElement) => {
      this.renderer.listen(button, 'click', () => {
        this.renderer.setStyle(modal, 'opacity', '0');
        this.renderer.setStyle(modal, 'top', '15%');
        this.renderer.setStyle(modal, 'display', 'none');
        this.renderer.setStyle(overlay, 'display', 'none');
      });
    });
  }

  onButtonClick() {
    this.router.navigate(['/aboutme']);
  }

  onSignUpClick() {
    this.router.navigate(['/register']);
  }

  login() {
    const email = this.email;
    const password = this.password;
    this.http.post('http://localhost:3000/api/login', { email, password }).subscribe((res: any) => {
      console.log(res);
      // Set session variable for user
      sessionStorage.setItem('currentUser', JSON.stringify(res));
      // Set loggedIn to true
      this.loggedIn = true;
      // If the login was successful, redirect to the myaccount page
      this.router.navigate(['/myaccount']);
    }, (err: any) => {
      console.error(err);
      // Handle login error here
    });
  }

  logout() {
  // Remove session variable for user
  sessionStorage.removeItem('currentUser');
  // Redirect to home page
  this.router.navigate(['/']);
}

}
