//
// import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
// import { Task } from '../../../core/models/task';
// import { TaskService } from '../../../core/services/task.service';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { Resource } from '../../../core/models/resource';
// import { ResourceService } from '../../../core/services/resource.service';
// import {FormsModule, NgForm} from '@angular/forms';
// import {
//   MatCell,
//   MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef,
//   MatHeaderRow,
//   MatHeaderRowDef,
//   MatRow,
//   MatRowDef, MatTable,
//   MatTableDataSource
// } from '@angular/material/table';
// import {MatFormField} from "@angular/material/form-field";
// import {DatePipe, NgIf} from "@angular/common";
// import {MatInput} from "@angular/material/input";
// import {MatButton, MatIconButton} from "@angular/material/button";
// import {MatIcon} from "@angular/material/icon";
// import {MatTooltip} from "@angular/material/tooltip";
//
// @Component({
//   selector: 'app-task-management',
//   templateUrl: './task-management.component.html',
//   standalone: true,
//   imports: [
//     FormsModule,
//     MatFormField,
//     NgIf,
//     MatInput,
//     MatButton,
//     MatCell,
//     MatRow,
//     MatHeaderRow,
//     MatRowDef,
//     MatHeaderRowDef,
//     MatCellDef,
//     MatHeaderCellDef,
//     MatColumnDef,
//     MatHeaderCell,
//     MatTable,
//     MatPaginator,
//     MatIcon,
//     MatIconButton,
//     MatTooltip,
//     DatePipe
//   ],
//   styleUrls: ['./task-management.component.scss']
// })
// export class TaskManagementComponent implements OnInit, AfterViewInit {
//
//   tasks: MatTableDataSource<Task> = new MatTableDataSource();
//   selectedTask?: Task;
//   selectedTaskId?: number;
//   isEditing = false;
//   resources: Resource[] = [];
//   formTask: {
//     endDate: string;
//     description: string;
//     resources: any[];
//     id: number;
//     projectId: number;
//     startDate: string;
//     status: string
//   } = this.getEmptyTask();
//   displayedColumns: string[] = ['id', 'description', 'startDate', 'endDate', 'status', 'projectId', 'actions'];
//
//   @ViewChild(MatSort) sort!: MatSort;
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//
//   constructor(private taskService: TaskService, private resourceService: ResourceService) {}
//
//   ngOnInit(): void {
//     this.loadTasks();
//   }
//
//   ngAfterViewInit(): void {
//     this.tasks.sort = this.sort;
//     this.tasks.paginator = this.paginator;
//   }
//
//   loadTasks(): void {
//     this.taskService.getAllTasks().subscribe(
//       tasks => this.tasks.data = tasks,
//       error => console.error('Error loading tasks', error)
//     );
//   }
//
//   onEdit(task: Task): void {
//     this.selectedTask = { ...task };
//     // @ts-ignore
//     this.formTask = { ...task };
//     this.isEditing = true;
//   }
//
//   onDelete(task: Task): void {
//     if (confirm('Are you sure you want to delete this task?')) {
//       this.taskService.deleteTask(task.id!).subscribe(
//         () => this.loadTasks(),
//         error => console.error('Error deleting task', error)
//       );
//     }
//   }
//
//   onAddTask(): void {
//     this.formTask = this.getEmptyTask();
//     this.selectedTask = undefined;
//     this.isEditing = false;
//   }
//
//   viewResources(taskId: number): void {
//     this.selectedTaskId = taskId;
//     this.resourceService.getResourcesByTaskId(taskId).subscribe(
//       resources => this.resources = resources,
//       error => console.error(`Error loading resources for task ${taskId}:`, error)
//     );
//   }
//
//   onSubmit(): void {
//     if (this.isEditing) {
//       this.taskService.updateTask(this.formTask.id!, this.formTask).subscribe(
//         () => this.loadTasks(),
//         error => console.error('Error updating task', error)
//       );
//     } else {
//       this.taskService.createTask(this.formTask).subscribe(
//         () => this.loadTasks(),
//         error => console.error('Error adding task', error)
//       );
//     }
//     this.formTask = this.getEmptyTask();
//     this.isEditing = false;
//   }
//
//   getEmptyTask(): {
//     endDate: string;
//     description: string;
//     resources: any[];
//     id: number;
//     projectId: number;
//     startDate: string;
//     status: string
//   } {
//     return { id: 0, description: '', startDate: '', endDate: '', status: '', projectId: 0, resources: [] };
//   }
// }
import { Component } from '@angular/core';
import { Task } from '../../../core/models/task';
import { TaskService } from '../../../core/services/task.service';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableModule
} from "@angular/material/table";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatTooltip, MatTooltipModule} from "@angular/material/tooltip";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatInput, MatInputModule} from "@angular/material/input";
import {ResourceService} from "../../../core/services/resource.service";
import {Resource} from "../../../core/models/resource";

@Component({
  selector: 'app-task-management',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    DatePipe,
    NgIf,
    MatButtonModule,
    MatFormFieldModule,
    MatFormField,
    MatTableModule,
    MatColumnDef,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderCell,
    MatIconButton,
    MatIconModule,
    MatTooltipModule,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatPaginatorModule,
    MatInputModule
  ],
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss']
})
export class TaskManagementComponent {
  tasks: Task[] = [];
  selectedTask?: Task;
  selectedTaskId?: number;
  isEditing = false;
  resources: Resource[] = [];
  formTask: Task = {
    id: 0,
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    status: 'PENDING',
    projectId: 0 ,
    resources : []
  };
  displayedColumns: string[] = ['id', 'description', 'startDate', 'endDate', 'status','projectId','actions'];

  constructor(private taskService: TaskService , private resourceService : ResourceService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(
      tasks => {
        console.log('Loaded tasks:', tasks);
        this.tasks = tasks;
      },
      error => console.error('Error loading tasks', error)
    );
  }

  onEdit(task: Task): void {
    this.selectedTask = { ...task };
    this.formTask = { ...task };
    this.isEditing = true;
  }

  onDelete(task: Task): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(task.id!).subscribe(
        () => this.loadTasks(),
        error => console.error('Error deleting task', error)
      );
    }
  }

  onAddTask(): void {
    this.formTask = {
      id: 0,
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      status: 'PENDING',
      projectId: 0 ,
      resources : []
    };
    this.selectedTask = undefined;
    this.isEditing = false;
  }
  viewResources(taskId: number): void {
    this.selectedTaskId = taskId;
    this.taskService.getResourcesByTaskId(taskId).subscribe(
      (resources) => this.resources = resources,
      (error) => console.error(`Error loading resources for task ${taskId}: ${error}`)
    );
  }

  onSubmit(): void {
    if (this.isEditing && this.selectedTask) {
      this.taskService.updateTask(this.selectedTask.id!, this.formTask).subscribe(
        () => {
          this.loadTasks();
          this.formTask = { id: 0, description: '', startDate: new Date(), endDate: new Date(), status: 'PENDING', projectId: 0  , resources : []};
          this.selectedTask = undefined;
          this.isEditing = false;
        },
        error => console.error('Error updating task', error)
      );
    } else {
      this.taskService.createTask(this.formTask).subscribe(
        () => {
          this.loadTasks();
          this.formTask = { id: 0, description: '', startDate: new Date(), endDate: new Date(), status: 'PENDING', projectId: 0  , resources : []};
          this.isEditing = false;
        },
        error => console.error('Error creating task', error)
      );
    }
  }
}
