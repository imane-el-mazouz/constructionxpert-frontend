import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models/project.model';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { CommonModule } from '@angular/common';  // CommonModule to use built-in pipes
import { FormsModule } from '@angular/forms';
import {Task} from "../../../core/models/task";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";

@Component({
  selector: 'app-project-list',
  standalone: true,
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    CommonModule,
    FormsModule,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput
  ]
})
export class ProjectListComponent implements OnInit {
  projects = new MatTableDataSource<Project>([]);
  displayedColumns: string[] = ['name', 'startDate', 'endDate', 'budget', 'actions'];

  selectedProjectTasks: Task[] = [];
  selectedProjectId: number | null = null;


  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  totalProjects: number = 0;
  pageSize: number = 5;
  currentPage: number = 0;
  sortField: string = 'id';
  sortDirection: string = 'asc';

  minBudget?: number;
  maxBudget?: number;
  startDate?: string;
  endDate?: string;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        this.projects.data = projects;
        this.projects.paginator = this.paginator;
        this.projects.sort = this.sort;
      },
      error: () => {
        this.snackBar.open('Error loading projects', 'Close', { duration: 3000 });
      }
    });
    this.projectService.getFilteredProjects(this.minBudget, this.maxBudget, this.startDate, this.endDate)
      .subscribe({
        next: (response) => {
          this.projects.data = response.content;
          this.projects.paginator = this.paginator;
          this.projects.sort = this.sort;
        },
        error: () => {
          this.snackBar.open('Error loading projects', 'Close', { duration: 3000 });
        }
      });
  }

  // applyFilter(event: Event): void {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.projects.filter = filterValue.trim().toLowerCase();
  // }

  applyFilter(): void {
    this.loadProjects();
  }


  openProjectDialog(project?: Project): void {
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      width: '500px',
      data: { project: project || null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProjects();
      }
    });
  }

  deleteProject(project: Project): void {
    if (confirm(`Are you sure you want to delete ${project.name}?`)) {
      this.projectService.deleteProject(project.id).subscribe({
        next: () => {
          this.loadProjects();
          this.snackBar.open('Project deleted successfully', 'Close', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Error deleting project', 'Close', { duration: 3000 });
        }
      });
    }
  }
  viewTasks(projectId: number): void {
    this.selectedProjectId = projectId;
    this.projectService.getTasksByProjectId(projectId).subscribe({
      next: (tasks) => {
        this.selectedProjectTasks = tasks;
      },
      error: () => {
        this.snackBar.open('Error loading tasks', 'Close', { duration: 3000 });
      }
    });
  }
}
