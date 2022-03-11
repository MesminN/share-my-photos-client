import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  physicalActionPerformed: EventEmitter<string> = new EventEmitter <string> ();
  performActionProgrammatically: EventEmitter<string> = new EventEmitter <string> ();
  constructor() { }
}
