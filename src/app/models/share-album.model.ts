import {User} from "./user.model";
import {Album} from "./album.model";

export interface ShareAlbum {
  user: User;
  album: Album;
}
