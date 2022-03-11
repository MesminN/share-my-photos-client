import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {HomeComponent} from "../../components/home/home.component";
import {AuthGuard} from "../../services/auth.guard";

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuard]}
    ] as Routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
