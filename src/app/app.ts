import { Component, signal, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecom-betacom-fe');
  @ViewChild('drawer') drawer!: MatSidenav;

  constructor(public router: Router) {}

  isActive(url: string): boolean {
  return this.router.url === url;
}
}