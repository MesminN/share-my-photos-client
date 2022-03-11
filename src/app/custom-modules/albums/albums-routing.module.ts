import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'

import { EditAlbumComponent } from 'src/app/components/albums/edit-album/edit-album.component';
import { AlbumPhotosComponent } from 'src/app/components/albums/album-photos/album-photos.component';
import { PhotosSliderComponent } from 'src/app/components/photos/photos-slider/photos-slider.component';
import { NoAlbumDetailComponent } from 'src/app/components/albums/no-album-detail/no-album-detail.component';
import { AlbumsComponent } from 'src/app/components/albums/albums.component';
import { AuthGuard } from 'src/app/services/auth.guard';


const routes: Routes = [
  {path: 'albums', component: AlbumsComponent, canActivate: [AuthGuard],
    children:
      [
        {path: '', component: NoAlbumDetailComponent, pathMatch: 'full'},
        {path: 'new', component: EditAlbumComponent},
        {path: ':id/:name', component: AlbumPhotosComponent},
        {path: ':id/:name/edit', component: EditAlbumComponent},
        {path: ':id/:name/view', component: PhotosSliderComponent}
      ]
  }
]

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AlbumsRoutingModule { }
