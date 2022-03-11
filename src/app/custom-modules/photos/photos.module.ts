import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PhotoItemComponent } from 'src/app/components/photos/photos-list/photo-item/photo-item.component';
import { PhotosListComponent } from 'src/app/components/photos/photos-list/photos-list.component';
import { PhotosSliderComponent } from 'src/app/components/photos/photos-slider/photos-slider.component';
import { PhotosComponent } from 'src/app/components/photos/photos.component';
import { SharedModule } from '../shared/shared.module';
import { PhotosRoutingModule } from './photos-routing.module';

@NgModule({
  declarations: [
    PhotosListComponent,
    PhotosComponent,
    PhotoItemComponent,
    PhotosSliderComponent
  ],
  imports: [
    SharedModule,
    PhotosRoutingModule
  ],
  exports: [
    PhotoItemComponent
  ]
})
export class PhotosModule { }
