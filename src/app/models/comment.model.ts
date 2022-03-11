import {User} from "./user.model";

export interface Comment {
  id: number;
  commentContent: String;
  user: User;
}
