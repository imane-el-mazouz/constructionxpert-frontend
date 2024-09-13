import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


import {MatSnackBar} from "@angular/material/snack-bar";
import { ProjectService } from '../../core/services/project.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { ToolbarComponent } from '../../shared/components/toolbar/toolbar.component';
import { ProjectCardComponent } from '../projects/project-card/project-card.component';
import { Project } from '../../core/models/project.model';
import { ProjectListComponent } from "../projects/project-list/project-list.component";

@Component({
  selector: 'app-dash-user',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    FormsModule,
    ToolbarComponent,
    SidebarComponent,
    ProjectCardComponent,
    StatCardComponent,
    ProjectListComponent
],
  templateUrl: './dash-user.component.html',
  styleUrls: ['./dash-user.component.scss']
})
export class DashUserComponent implements OnInit, OnDestroy {
  projectStats = [
    { icon: 'folder', value: '24', label: 'Total Projects', color: 'primary' },
    { icon: 'check_circle', value: '18', label: 'Completed', color: 'success' },
    { icon: 'warning', value: '3', label: 'At Risk', color: 'warning' },
    { icon: 'error', value: '1', label: 'Delayed', color: 'danger' },
  ];

  projects: Project[] = [];
  filteredProjects: Project[] = [];
  pagedProjects: Project[] = [];
  searchTerm = '';
  sortBy: keyof Project = 'name';
  pageSize = 6;
  currentPage = 0;
  isMobile = false;
  private destroy$ = new Subject<void>();

  constructor(
    private projectService: ProjectService,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar
  ) {}


  ngOnInit() {
    this.projectService.getAllProjects().subscribe(projects => {
      this.projects = projects;
      this.filterProjects();
    });

    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filterProjects() {
    this.filteredProjects = this.projects.filter(project =>
      project.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.sortProjects();
    this.currentPage = 0;
    this.updatePagedProjects();
  }

  sortProjects() {
    this.filteredProjects.sort((a, b) => {
      const aValue = a[this.sortBy];
      const bValue = b[this.sortBy];


      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue;
      }

      return 0;
    });
    this.updatePagedProjects();
  }

  updatePagedProjects() {
    const startIndex = this.currentPage * this.pageSize;
    this.pagedProjects = this.filteredProjects.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedProjects();
  }

  clearSearch() {
    this.searchTerm = '';
    this.filterProjects();
  }

  openNewProjectDialog() {
    console.log('Open new project dialog');
  }

  onDeleteProject(project: Project) {
    if (confirm(`Are you sure you want to delete the project "${project.name}"?`)) {
      this.projectService.deleteProject(project.id).subscribe(
        () => {
          this.projects = this.projects.filter(p => p.id !== project.id);
          this.filterProjects();
          this.showSnackBar('Project deleted successfully');
        },
        (error) => {
          console.error('Error deleting project:', error);
          this.showSnackBar('Error deleting project');
        }
      );
    }
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
