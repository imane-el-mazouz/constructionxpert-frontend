import { Component } from '@angular/core';
import { Task } from '../../../core/models/task';
import { TaskService } from '../../../core/services/task.service';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-task-management',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    DatePipe,
    NgIf
  ],
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss'] // Fixed typo
})
export class TaskManagementComponent {
  tasks: Task[] = [];
  selectedTask?: Task;
  isEditing = false;
  formTask: Task = {
    id: 0,
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    status: 'PENDING',
    projectId: 0
  };

  constructor(private taskService: TaskService) {}

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
      projectId: 0
    };
    this.selectedTask = undefined;
    this.isEditing = false;
  }

  onSubmit(): void {
    if (this.isEditing && this.selectedTask) {
      this.taskService.updateTask(this.selectedTask.id!, this.formTask).subscribe(
        () => {
          this.loadTasks();
          this.formTask = { id: 0, description: '', startDate: new Date(), endDate: new Date(), status: 'PENDING', projectId: 0 };
          this.selectedTask = undefined;
          this.isEditing = false;
        },
        error => console.error('Error updating task', error)
      );
    } else {
      this.taskService.createTask(this.formTask).subscribe(
        () => {
          this.loadTasks();
          this.formTask = { id: 0, description: '', startDate: new Date(), endDate: new Date(), status: 'PENDING', projectId: 0 };
          this.isEditing = false;
        },
        error => console.error('Error creating task', error)
      );
    }
  }
}
