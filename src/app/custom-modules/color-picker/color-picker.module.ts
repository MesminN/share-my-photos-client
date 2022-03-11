import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorPaletteComponent } from './color-palette/color-palette.component';
import { ColorPickerComponent } from './color-picker.component';
import { ColorSliderComponent } from './color-slider/color-slider.component';
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [CommonModule, MatCardModule, MatDialogModule, MatButtonModule],
  declarations: [ColorPickerComponent, ColorPaletteComponent, ColorSliderComponent],
  exports: [ColorPickerComponent]
})
export class ColorPickerModule {}
