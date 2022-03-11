import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Album} from "../models/album.model";

@Injectable({
  providedIn: 'root'
})
export class AlbumService implements OnInit{

  endpoint = 'api/album/';

  constructor(private http: HttpClient) { }

  ngOnInit() {}

  getAlbums() {
    return this.http.get<Album[]>(this.endpoint);
  }

  getAlbum(id: number) {
    return this.http.get<Album>(this.endpoint+id);
  }

  createAlbum(album: Album) {
    return this.http.post<Album>(this.endpoint, album);
  }

  deleteAlbum(id: number) {
    return this.http.delete<Album>(this.endpoint+id);
  }

  updateAlbum(album: Album) {
    return this.http.put<Album>(this.endpoint+album.id, album);
  }
}
