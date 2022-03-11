import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlbumService} from "../../../services/album.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Album} from "../../../models/album.model";

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css']
})
export class AlbumsListComponent implements OnInit {

  albums : Album[] = [];

  constructor(private albumService: AlbumService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.albumService.getAlbums().subscribe((data) => {
      this.albums = data;
    });
  }

  onCreateNewAlbum() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
