import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./custom-modules/app-routing/app-routing.module";
import { AuthComponent } from './components/auth/auth.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {SharedModule} from "./custom-modules/shared/shared.module";
import {FooterComponent} from "./components/footer/footer.component";
import {MenuModule} from "./custom-modules/menu/menu.module";
import {AlbumsModule} from "./custom-modules/albums/albums.module";
import {PhotosModule} from "./custom-modules/photos/photos.module";
import {HomeModule} from "./custom-modules/home/home.module";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    MenuModule,
    HomeModule,
    AlbumsModule,
    PhotosModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
