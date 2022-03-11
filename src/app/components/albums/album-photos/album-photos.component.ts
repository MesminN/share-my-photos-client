import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AlbumService} from "../../../services/album.service";
import {Album} from "../../../models/album.model";
import {Photo} from "../../../models/photo.model";

@Component({
  selector: 'app-album-photos',
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.css']
})
export class AlbumPhotosComponent implements OnInit {

  @Input() album: Album;

  constructor(private albumService: AlbumService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if(+params['id'] && !this.isEditMode()) {
          this.albumService.getAlbum(+params['id']).subscribe(album => {
            this.album = album;
          });
        }
      }
    );
  }

  onFileChange(event:any) {
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        let photo: Photo = {
          type: event.target.files[i].type.split('/')[1],
          imageFile: event.target.files[i]
        }
        reader.onload = (event:any) => {
          console.log(event.target.result);
          photo.imageValue = event.target.result;
          this.album.photos.push(photo);
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  onAddPhotos() {
    document.getElementById("file").click();
  }

  onEditAlbum() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  hiddeAddButton() {
    return this.route.snapshot.url.length !== 1 && this.route.snapshot.url.length !== 3;
  }

  isEditMode(): boolean {
    return this.route.snapshot.url[this.route.snapshot.url.length-1].path === 'edit';
  }
}
