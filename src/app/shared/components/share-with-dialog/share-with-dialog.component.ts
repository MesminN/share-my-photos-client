import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ShareWithDialogData} from "../../models/share-with-dialog-data";
import {ShareAlbumService} from "../../../services/share-album.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-share-with-dialog',
  templateUrl: './share-with-dialog.component.html',
  styleUrls: ['./share-with-dialog.component.css']
})
export class ShareWithDialogComponent implements OnInit {

  shareForm: FormGroup;

  constructor(private userService: UserService,
              private shareAlbumService: ShareAlbumService,
              public dialogRef: MatDialogRef<ShareWithDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ShareWithDialogData) {}

  ngOnInit(): void {
    this.shareForm = new FormGroup({
      emails: new FormArray([])
    });
    this.onAddEmail();
  }

  get emails() {
    return this.shareForm.get('emails') as FormArray
  }

  onSubmit() {
    this.emails.controls.forEach(controlValue => {
      if(this.data.isAlbum) {
        this.shareAlbumService.shareAlbumWith(this.data.itemId, controlValue.value).subscribe(value => {
          this.shareForm.reset();
          this.onClose();
        });
      } else {
        // TODO: sharePhoto
      }
    });
  }

  onAddEmail() {
    const control = new FormControl(null, [Validators.required, Validators.email], [this.isValidUser.bind(this)]);
    this.emails.push(control);
  }

  isValidUser(control: FormControl): Observable<any> {
    return this.userService.getUser(control.value).pipe(map(value => value ? null : {invalidUser: true}));
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
