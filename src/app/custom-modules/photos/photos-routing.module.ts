import { NgModule } from '@angular/core';

import {RouterModule, Routes } from '@angular/router';
import { NoUserDetailComponent } from 'src/app/components/photos/no-user-detail/no-user-detail.component';
import { PhotosSliderComponent } from 'src/app/components/photos/photos-slider/photos-slider.component';
import { PhotosComponent } from 'src/app/components/photos/photos.component';

import { AuthGuard } from 'src/app/services/auth.guard';

const routes: Routes = [
  {path: 'photos', component: PhotosComponent, canActivate: [AuthGuard],
    children:
      [
        {path: '', component: NoUserDetailComponent, pathMatch: 'full'},
        {path: 'view', component: PhotosSliderComponent}
      ]
  }
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PhotosRoutingModule { }
