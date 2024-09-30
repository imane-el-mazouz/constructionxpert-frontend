import {Component, OnInit, ViewChild} from '@angular/core';
import {Project} from "../../../core/models/project.model";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Status} from "../../../core/enums/status";
import {ProjectService} from "../../../core/services/project.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Task} from "../../../core/models/task";
import {MatSort} from "@angular/material/sort";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-filter-projects',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatLabel
  ],
  templateUrl: './filter-projects.component.html',
  styleUrl: './filter-projects.component.scss'
})
export class FilterProjectsComponent implements OnInit {

  project: Project | undefined;
  visible: Boolean = false;
  displayedColumns: string[] = ['id', 'name', 'status', 'startDate', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  totalProjects: number = 0;
  pageSize: number = 5;
  currentPage: number = 0;
  sortField: string = 'id';
  sortDirection: string = 'asc';

  selectedProjectTasks: Task[] = [];
  selectedProjectId: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterForm: FormGroup;
  statusOptions = Object.values(Status);

  constructor(private projectService: ProjectService,
              private fb: FormBuilder ,
              private dialog: MatDialog,
              private snackBar: MatSnackBar)
  {
    this.filterForm = this.fb.group({
      name: [''],
      status: [''],
      startDate: ['']
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    const { name, status, startDate } = this.filterForm.value;

    this.projectService.getFilteredProjects(
      this.currentPage,
      this.pageSize,
      this.sortField,
      this.sortDirection,
      name,
      status,
      startDate
    ).subscribe((data) => {
      this.dataSource.data = data.content;
      this.totalProjects = data.totalElements;
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadProjects();
  }

  sortData(sort: any) {
    this.sortField = sort.active;
    this.sortDirection = sort.direction;
    this.loadProjects();
  }

  applyFilter() {
    this.loadProjects();
  }

  editRow(row: any) {
    row.isEdit = true;
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

  cancelEdit(row: any) {
    row.isEdit = false;
  }


  infos(element: any) {
    this.projectService.getProjectById(element.id!).subscribe({
      next: (projects) => {
        this.project = element;
      },
      error: () => {
      }
    });
    this.visible = true;
  }
}
