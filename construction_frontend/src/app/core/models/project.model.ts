import {Task} from "./task";

export interface Project {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    budget: number;
    tasks: Task[];


}
