//
// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatMenuModule } from '@angular/material/menu';
// import { trigger, state, style, transition, animate } from '@angular/animations';
// import { Project } from '../../../core/models/project.model';
// import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
// import {MatDatepicker, MatDatepickerInput} from "@angular/material/datepicker";
// import {MatError, MatFormField, MatInput} from "@angular/material/input";
//
// @Component({
//   selector: 'app-project-card',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatCardModule,
//     MatButtonModule,
//     MatIconModule,
//     MatMenuModule,
//     MatDatepicker,
//     MatDatepickerInput,
//     ReactiveFormsModule,
//     MatInput,
//     MatError,
//     MatFormField
//   ],
//   templateUrl: './project-card.component.html',
//   styleUrls: ['./project-card.component.scss'],
//   animations: [
//     trigger('cardAnimation', [
//       transition(':enter', [
//         style({ opacity: 0, transform: 'translateY(10px)' }),
//         animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
//       ])
//     ])
//   ]
// })
// export class ProjectCardComponent {
//   @Input() project!: Project;
//   @Output() deleteProject = new EventEmitter<Project>();
//   @Output() viewTasks = new EventEmitter<Project>();
//   @Output() editProject = new EventEmitter<Project>();
//
//   projectForm!: FormGroup;
//
//   constructor(private fb: FormBuilder) {}
//
//   ngOnInit(): void {
//     this.projectForm = this.fb.group({
//       name: [this.project.name, [Validators.required, Validators.minLength(3)]],
//       description: [this.project.description],
//       startDate: [this.project.startDate, Validators.required],
//       endDate: [this.project.endDate, Validators.required],
//       budget: [this.project.budget, [Validators.required, Validators.min(0)]]
//     });
//   }
//
//   get name() {
//     return this.projectForm.get('name');
//   }
//
//   get description() {
//     return this.projectForm.get('description');
//   }
//
//   get startDate() {
//     return this.projectForm.get('startDate');
//   }
//
//   get endDate() {
//     return this.projectForm.get('endDate');
//   }
//
//   get budget() {
//     return this.projectForm.get('budget');
//   }
//
//   onDelete(): void {
//     this.deleteProject.emit(this.project);
//   }
//
//   onEdit(): void {
//     if (this.projectForm.valid) {
//       this.editProject.emit(this.projectForm.value);
//     } else {
//       this.projectForm.markAllAsTouched();
//     }
//   }
// }
// import {Component, EventEmitter, Input, Output} from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatMenuModule } from '@angular/material/menu';
// import { trigger, state, style, transition, animate } from '@angular/animations';
// import { Project } from '../../../core/models/project.model';
//
// @Component({
//   selector: 'app-project-card',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatCardModule,
//     MatButtonModule,
//     MatIconModule,
//     MatMenuModule
//   ],
//   templateUrl: './project-card.component.html',
//   styleUrls: ['./project-card.component.scss'],
//   animations: [
//     trigger('cardAnimation', [
//       transition(':enter', [
//         style({ opacity: 0, transform: 'translateY(10px)' }),
//         animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
//       ])
//     ])
//   ]
// })
// export class ProjectCardComponent {
//   @Input() project!: Project;
//
//   @Output() deleteProject = new EventEmitter<Project>();
//   @Output() viewTasks = new EventEmitter<Project>();
//   @Output() editProject = new EventEmitter<Project>();
//
//   onDelete(): void {
//     this.deleteProject.emit(this.project);
//   }
//
//   onEdit(): void {
//     console.log('Edit project:', this.project);
//   }
// }
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ProjectCardComponent {
  @Input() project!: Project;

  @Output() deleteProject = new EventEmitter<Project>();
  @Output() viewTasks = new EventEmitter<Project>();
  @Output() editProject = new EventEmitter<Project>();

  onDelete(): void {
    this.deleteProject.emit(this.project);
  }

  onEdit(): void {
    this.editProject.emit(this.project);
  }
}
