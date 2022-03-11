import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {AlbumService} from "../../../../services/album.service";

import {Album} from "../../../../models/album.model";
import {MatDialog} from "@angular/material/dialog";
import {ShareWithDialogComponent} from "../../../../shared/components/share-with-dialog/share-with-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.css']
})
export class AlbumItemComponent implements OnInit {
  @Input() album: Album;

  constructor(public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private albumService: AlbumService) { }

  ngOnInit() {}

  onShare() {
    if(this.album) {
      const dialogRef = this.dialog.open(ShareWithDialogComponent, {
        data: {itemId: this.album.id, isAlbum: true}
      });
    }
  }

  onDelete() {
    if(this.album) {
      this.albumService.deleteAlbum(this.album.id).subscribe(value => {
        this.router.navigate(['albums']).then(() => {
          window.location.reload();
        });
      });
    }
  }
}
