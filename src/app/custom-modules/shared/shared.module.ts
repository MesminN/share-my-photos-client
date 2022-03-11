import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

import {IvyCarouselModule} from "../../../../projects/angular-responsive-carousel/src/lib/carousel.module";
import { ShareWithDialogComponent } from 'src/app/shared/components/share-with-dialog/share-with-dialog.component';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';
import { ColorPickerModule } from '../color-picker/color-picker.module';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ShareWithDialogComponent,
    LoadingSpinnerComponent,
    AlertDialogComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    IvyCarouselModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
  ],
  exports: [
    CommonModule,
    ShareWithDialogComponent,
    LoadingSpinnerComponent,
    AlertDialogComponent,

    AngularMaterialModule,
    IvyCarouselModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
  ]
})
export class SharedModule { }
