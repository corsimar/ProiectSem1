import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goHome(): void {
    this.router.navigate(['/home/homepage']);
  }

  goAddProject(): void {
    this.router.navigate(['/home/form']);
  }

  goViewProjects(): void {
    this.router.navigate(['/home/table']);
  }

  signOut(): void {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('rememberMe');
    this.router.navigate(['/auth']);
  }
}
