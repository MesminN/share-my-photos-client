import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ColorPickerComponent} from "../../../custom-modules/color-picker/color-picker.component";
import {Album} from "../../../models/album.model";
import {AlbumService} from "../../../services/album.service";
import {PhotoService} from "../../../services/photo.service";

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.css']
})
export class EditAlbumComponent implements OnInit {

  isCreation: boolean = true;
  albumCreationForm: FormGroup;
  album: Album = {
    backgroundColor: 'mediumblue',
    photos: []
  };

  constructor(private albumService: AlbumService,
              private photoService: PhotoService,
              private router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.albumCreationForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
    this.route.params.subscribe(
      (params: Params) => {
        if(+params['id']) {
          this.albumService.getAlbum(+params['id']).subscribe(album => {
            this.album = album;
            this.albumCreationForm.get('name').setValue(this.album.name);
            this.albumCreationForm.get('description').setValue(this.album.description);
          });
        }
      }
    );
  }

  onSaveAlbum() {
    this.album.name = this.albumCreationForm.get('name').value;
    this.album.description = this.albumCreationForm.get('description').value;
    if(this.album.id) {
      this.albumService.updateAlbum(this.album).subscribe(savedAlbum => {
        for (let i = 0; i < this.album.photos.length; i++) {
          let image = this.album.photos[i];
          if(!image.id) {
            image.album = savedAlbum;
            image.description = savedAlbum.description;
            this.photoService.uploadPhoto(image).subscribe(value => {
            });
          }
          if(i == this.album.photos.length - 1) {
            this.albumCreationForm.reset();
            this.router.navigate(['../'], {relativeTo: this.route}).then(() => {
              window.location.reload();
            });
          }
        }
      });
    } else {
      this.albumService.createAlbum(this.album).subscribe(savedAlbum => {
        for (let i = 0; i < this.album.photos.length; i++) {
          let image = this.album.photos[i];
          image.album = savedAlbum;
          image.description = savedAlbum.description;
          this.photoService.uploadPhoto(image).subscribe(value => {
            if(i == this.album.photos.length - 1) {
              this.albumCreationForm.reset();
              this.router.navigate(['../'], {relativeTo: this.route}).then(() => {
                window.location.reload();
              });
            }
          });
        }
      });
    }
  }

  onPickColor() {
    let dialogRef = this.dialog.open(ColorPickerComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.album.backgroundColor = result;
      }
    });
  }

  onClose() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
