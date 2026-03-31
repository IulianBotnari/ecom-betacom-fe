import {Component} from '@angular/core';

@Component({
  selector: 'sidenav-autosize-example',
  templateUrl: 'admin.html',
  styleUrl: 'admin.css',
  standalone: false,
})
export class Admin {

  //activeView: string = 'user'
  categoria: any
  activeView: string | null = null
  openMenu: string | null = null;

  toggleMenu(menuId: string) {

    this.openMenu = this.openMenu === menuId ? null : menuId;
  }

  setView(activeView: string) {
    this.activeView = activeView;
  }
}