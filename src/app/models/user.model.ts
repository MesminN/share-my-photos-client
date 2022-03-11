import {Photo} from "./photo.model";

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  images?: Photo[];
}
