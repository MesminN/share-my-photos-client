import { Component, Input, OnInit} from '@angular/core';

import {Photo} from "../../../../models/photo.model";
import {PhotoService} from "../../../../services/photo.service";

@Component({
  selector: 'app-photo-item',
  templateUrl: './photo-item.component.html',
  styleUrls: ['./photo-item.component.css']
})
export class PhotoItemComponent implements OnInit {
  @Input() photo: Photo;

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
  }

  onPhotoSelected() {
    if(this.photo) {
      this.photoService.photoSelectedSubject.next(this.photo);
    }
  }
}
