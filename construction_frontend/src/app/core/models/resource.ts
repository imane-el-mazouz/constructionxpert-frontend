import {Task} from "./task";
import {ResourceType} from "../enums/ResourceType";

export interface Resource {

  id? : number ;
  name? : string ;
  quantity? : number ;
  type? : ResourceType ;
  provider ? : string
  task : Task[];





}
