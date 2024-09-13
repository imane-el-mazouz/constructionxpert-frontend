import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Project } from '../../core/models/project.model';
import { ProjectFormComponent } from '../../features/projects/project-form/project-form.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openProjectForm(project?: Project): Observable<Project | undefined> {
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      width: '500px',
      data: { project: project || null }
    });

    return dialogRef.afterClosed();
  }
}