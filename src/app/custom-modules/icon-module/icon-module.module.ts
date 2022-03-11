import { NgModule } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";

@NgModule({
  imports: [
  ]
})
export class IconModule {
  private path: string = "../../../assets/icons";
  constructor(
    private domSanitizer: DomSanitizer,
    public matIconRegistry: MatIconRegistry ) {
    this.matIconRegistry
      .addSvgIcon("album", this.setPath(`${this.path}/album.png`))
      .addSvgIcon("close", this.setPath(`${this.path}/close.png`))
      .addSvgIcon("gallery", this.setPath(`${this.path}/gallery.png`));
  }
  private setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
