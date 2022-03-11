import {Component, OnDestroy, OnInit} from '@angular/core';
import {Photo} from "../../../models/photo.model";
import {Subscription} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {PhotoService} from "../../../services/photo.service";

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.css']
})
export class PhotosListComponent implements OnInit, OnDestroy {

  private userSub: Subscription;

  photos : Photo[] = [];

  constructor(private authService: AuthService,
              private photoService: PhotoService) { }

  ngOnInit(): void {
    this.userSub = this.authService.authenticatedUserSubject.subscribe(user => {
      this.photoService.getPhotos().subscribe(photos => {
        this.photos = photos;
      })
    });
  }

  onFileChange(event:any) {
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        let photo: Photo = {
          imageFile: event.target.files[i]
        }
        reader.onload = (event:any) => {
          console.log(event.target.result);
          photo.imageValue = event.target.result;
          this.photos.push(photo);
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  onAddPhotos() {
    document.getElementById("file").click();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
