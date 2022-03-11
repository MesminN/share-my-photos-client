import {NgModule} from "@angular/core";

import {HomeComponent} from "../../components/home/home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {MenuModule} from "../menu/menu.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    MenuModule,
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule {}
