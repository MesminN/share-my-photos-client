import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Photo} from "../models/photo.model";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PhotoService implements OnInit{

  endpoint = 'api/photo/';
  photoSelectedSubject: Subject<Photo> = new Subject<Photo>();

  constructor(private http: HttpClient) { }

  ngOnInit() {}

  getPhotos() {
    return this.http.get<Photo[]>(this.endpoint);
  }

  getPhoto(id: number) {
    return this.http.get<Photo>(this.endpoint+id);
  }

  uploadPhoto(photo: Photo) {
    let photoFormData = new FormData();
    let description = '';
    if(photo.description) {
      description = photo.description;
    }
    photoFormData.append('description', description);
    if(photo.album) {
      photoFormData.append('album', `${photo.album.id}`);
    }
    if(photo.imageFile) {
      photoFormData.append('file', photo.imageFile);
    }
    if(photo.type) {
      photoFormData.append('type', photo.type);
    }
    return this.http.post<any>(this.endpoint+"upload/", photoFormData);
  }
}
