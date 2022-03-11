import {Component, OnDestroy, OnInit} from '@angular/core';
import {Menu} from "../../models/menu.model";
import {MenuService} from "../../services/menu.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  menus : Menu[] = [];

  constructor(private menuService: MenuService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.menus = this.menuService.getMenus().slice();
    this.userSub = this.authService.authenticatedUserSubject.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  goToLoginOrSignUp() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
