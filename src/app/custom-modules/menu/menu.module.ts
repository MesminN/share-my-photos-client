import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from 'src/app/components/menu/menu.component';
import { MenuItemComponent } from 'src/app/components/menu/menu-item/menu-item.component';
import {RouterModule} from "@angular/router";
import {AngularMaterialModule} from "../angular-material/angular-material.module";


@NgModule({
  declarations: [
    MenuComponent,
    MenuItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule
  ],
  exports: [MenuComponent, MenuItemComponent]
})
export class MenuModule { }
