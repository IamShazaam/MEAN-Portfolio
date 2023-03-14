import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

  showMediaList: boolean = false;
  lis: string[] = ['PHP', 'JavaScript', 'TypeScript', 'Games'];

  isLoggedIn!: boolean;

  constructor(private router: Router,
              private renderer: Renderer2,
              private el: ElementRef) {}

  ngOnInit(): void {

    // this.authService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
    //   this.isLoggedIn = isLoggedIn;
    // });

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

  onLogout() {
    // this.authService.logout();
  }

}
