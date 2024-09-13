import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Project } from '../../../core/models/project.model';
import { ProjectService } from '../../../core/services/project.service';


@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  @Input() project: Project | null = null;
  @Output() formSubmit = new EventEmitter<Project>();

  projectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private snackBar: MatSnackBar
  ) {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(0)]]
    }, { validators: this.dateRangeValidator });
  }

  ngOnInit(): void {
    if (this.project) {
      this.projectForm.patchValue(this.project);
    }
  }

  dateRangeValidator(form: FormGroup) {
    const start = form.get('startDate')?.value;
    const end = form.get('endDate')?.value;
    if (start && end && new Date(start) > new Date(end)) {
      return { dateRange: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const formValue = this.projectForm.value;
      const project: Project = {
        ...this.project,
        ...formValue,
        id: this.project?.id || 0,
      };

      if (this.project) {
        this.projectService.updateProject(this.project.id, project).subscribe({
          next: (updatedProject) => {
            this.formSubmit.emit(updatedProject);
            this.snackBar.open('Project updated successfully', 'Close', { duration: 3000 });
          },
          error: (error) => {
            console.error('Error updating project:', error);
            this.snackBar.open('Error updating project', 'Close', { duration: 3000 });
          }
        });
      } else {
        this.projectService.createProject(project).subscribe({
          next: (newProject) => {
            this.formSubmit.emit(newProject);
            this.snackBar.open('Project created successfully', 'Close', { duration: 3000 });
          },
          error: (error) => {
            console.error('Error creating project:', error);
            this.snackBar.open('Error creating project', 'Close', { duration: 3000 });
          }
        });
      }
    }
  }
}