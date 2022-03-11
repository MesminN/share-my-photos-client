import {Component, OnDestroy, OnInit} from '@angular/core';
import {PhotoService} from "../../services/photo.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit, OnDestroy {
  isPhotoSelected: boolean = false;
  private photoSelectedSub: Subscription;

  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.photoSelectedSub = this.photoService.photoSelectedSubject.subscribe(photo => {
      if(photo && photo.id) {
          this.isPhotoSelected = true;
      } else {
        this.isPhotoSelected = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.photoSelectedSub.unsubscribe();
  }
}
