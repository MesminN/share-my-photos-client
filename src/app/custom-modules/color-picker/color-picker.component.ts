import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent {
  public hue: string;
  public color: string;

  constructor(public dialogRef: MatDialogRef<ColorPickerComponent>) { }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
