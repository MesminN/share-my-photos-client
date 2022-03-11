import { NgModule } from '@angular/core';

import { AlbumsListComponent } from 'src/app/components/albums/albums-list/albums-list.component'
import { AlbumsComponent } from 'src/app/components/albums/albums.component';
import { AlbumPhotosComponent } from 'src/app/components/albums/album-photos/album-photos.component';
import { NoAlbumDetailComponent } from 'src/app/components/albums/no-album-detail/no-album-detail.component';
import { AlbumItemComponent } from 'src/app/components/albums/albums-list/album-item/album-item.component';

import { EditAlbumComponent } from 'src/app/components/albums/edit-album/edit-album.component';
import { SharedModule } from '../shared/shared.module';
import { AlbumsRoutingModule } from './albums-routing.module';
import {PhotosModule} from "../photos/photos.module";

@NgModule({
  declarations: [
    AlbumsComponent,
    AlbumsListComponent,
    AlbumPhotosComponent,
    AlbumItemComponent,
    NoAlbumDetailComponent,
    EditAlbumComponent
  ],
  imports: [
    SharedModule,
    PhotosModule,
    AlbumsRoutingModule
  ],
  exports: []
})
export class AlbumsModule { }
