import {Task} from "./task";

export interface Project {

  id? : number;
  name? : string;
  description? : string;
  startDate? : Date;
  endDate? : Date;
  budget? : number;
  tasks : Task[] ;
}
