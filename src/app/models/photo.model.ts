import {User} from "./user.model";
import {Comment} from "./comment.model";
import {Album} from "./album.model";

export interface Photo {
  id?: number;
  name?: string;
  type?: string;
  description?: string;
  imageFile: File;
  imageValue?: File;
  user?: User;
  album?: Album;
  comments?: Comment[];
}
