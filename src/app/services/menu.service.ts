import { Injectable } from '@angular/core';
import {Menu} from "../models/menu.model";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menus : Menu[] = [
    {title: 'Albums', url: '/albums', backgroundImagePath: 'assets/icons/albums-icon.png', description: 'All your albums. You can create some and share them with your friends'},
    {title: 'Photos', url: '/photos', backgroundImagePath: 'assets/icons/photos-icon.png', description: 'All your photos. You can create some and share them with your friends'}
  ];

  constructor() { }

  getMenus() {
    return this.menus;
  }
}
