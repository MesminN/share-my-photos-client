import { NgModule } from '@angular/core';

import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [],
  imports: [
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  exports: [
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ]
})
export class AngularMaterialModule { }
