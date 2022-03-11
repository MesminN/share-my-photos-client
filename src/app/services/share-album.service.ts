import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ShareAlbumService implements OnInit{

  endpoint = 'api/share-album/';

  constructor(private http: HttpClient) { }

  ngOnInit() {}

  shareAlbumWith(idAlbum: number, userEmail: string) {
    return this.http.post<any>(this.endpoint+idAlbum+'/'+userEmail, {albumId: idAlbum, userEmail: userEmail});
  }
}
