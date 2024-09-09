import {Role} from "../enums/role";
import {Projects} from "@angular/cli/lib/config/workspace-schema";

export interface User {
  id?: number;
  fullName?: string;
  username?: string;
  password?: string;
  email?: string;
  role?: Role;
}
