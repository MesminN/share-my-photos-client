import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Photo} from "../../../models/photo.model";
import {PhotoService} from "../../../services/photo.service";
import {AlbumService} from "../../../services/album.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { Stomp } from '@stomp/stompjs';
import * as SockJS from "sockjs-client";
import {CarouselService} from "../../../services/carousel.service";

@Component({
  selector: 'app-photos-slider',
  templateUrl: './photos-slider.component.html',
  styleUrls: ['./photos-slider.component.css']
})
export class PhotosSliderComponent implements OnInit, OnDestroy {
  @Input() height: number = 400;
  @Input() photos: Photo[] = [];
  private stompClient = null;
  private isActionFromMe = false;

  constructor(private photoService: PhotoService,
              private albumService: AlbumService,
              private router: Router,
              private route: ActivatedRoute,
              private carouselService: CarouselService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if(+params['id']) {
          this.albumService.getAlbum(+params['id']).subscribe(album => {
            this.photos = album.photos;
          });
        } else {
          this.photoService.getPhotos().subscribe(photos => {
            this.photos = photos;
          });
        }
      }
    );
    this.connect();
    this.carouselService.physicalActionPerformed.subscribe(value => {
      this.sendAction(value);
    });
  }

  onClose() {
    this.router.navigate(['../'], {relativeTo: this.route});
    this.photoService.photoSelectedSubject.next(null);
  }

  connect() {
    const socket = new SockJS('/api/app-stomp-endpoint');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/show-photos/action-occurred', function (actionResponse) {
        if(_this.isActionFromMe) {
          _this.isActionFromMe = false;
        } else {
          _this.carouselService.performActionProgrammatically.next(actionResponse.body);
          console.log(actionResponse.body);
        }
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected!');
  }

  sendAction(value: string) {
    this.stompClient.send(
      '/app/do-action',
      {},
      JSON.stringify({ 'action': value })
    );
    this.isActionFromMe = true;
  }

  ngOnDestroy() {
    this.disconnect();
  }
}
