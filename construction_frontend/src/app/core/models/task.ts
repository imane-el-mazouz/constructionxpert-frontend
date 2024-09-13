import {Status} from "../enums/status";
import {Project} from "./project";
import {Resource} from "./resource";

export interface Task {
  id? : number;
  description? : string;
  startDate? : Date;
  endDate? : Date;
  status? : string;

  // project : Project ;
  projectId: number;
  // resources : Resource[] ;
}
