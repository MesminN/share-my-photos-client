import { Photo } from "./photo.model";
import {User} from "./user.model";

export interface Album {
  id?: number;
  name ?: string;
  description?: string;
  backgroundColor ?: string;
  user?: User;
  photos?: Photo[];
}
