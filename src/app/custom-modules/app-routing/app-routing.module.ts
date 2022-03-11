import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NotFoundComponent} from "../../components/not-found/not-found.component";
import {AuthComponent} from "../../components/auth/auth.component";
import {AuthGuard} from "../../services/auth.guard";

const appRoutes: Routes = [
  {path: 'login', component: AuthComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
