import { Component, OnInit } from '@angular/core';
import {Menu} from "../../models/menu.model";
import {MenuService} from "../../services/menu.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menus: Menu[] = [];

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menus = this.menuService.getMenus().slice();
  }
}
