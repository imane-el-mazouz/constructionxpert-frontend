// import { Component, OnInit } from '@angular/core';
// import { ResourceService } from '../../../core/services/resource.service';
// import { Resource } from '../../../core/models/resource';
// import { FormsModule } from '@angular/forms';
// import { NgForOf, NgIf } from '@angular/common';
// import {ResourceType} from "../../../core/enums/ResourceType";
//
// @Component({
//   selector: 'app-resource-management',
//   standalone: true,
//   imports: [
//     FormsModule,
//     NgIf,
//     NgForOf
//   ],
//   templateUrl: './resource-management.component.html',
//   styleUrls: ['./resource-management.component.scss']
// })
// export class ResourceManagementComponent implements OnInit {
//
//   resources: Resource[] = [];
//   selectedResource?: Resource;
//   isEditing = false;
//   newResource: Resource = {
//     name: '',
//     quantity: 0,
//     type: ResourceType.MATERIAL,
//     provider: '',
//     taskId: ''
//   };
//
//   resourceTypes = ResourceType;
//
//   constructor(private resourceService: ResourceService) { }
//
//   ngOnInit(): void {
//     this.loadResources();
//   }
//
//   loadResources(): void {
//     this.resourceService.getResources().subscribe(
//       (resources) => this.resources = resources,
//       (error) => console.error(`Error loading resources: ${error}`)
//     );
//   }
//
//   onAddResource(): void {
//     this.resourceService.addResource(this.newResource).subscribe(
//       () => {
//         this.loadResources();
//         this.resetNewResource();
//       },
//       (error) => console.error(`Error adding resource: ${error}`)
//     );
//   }
//
//   onEditResource(resource: Resource): void {
//     this.selectedResource = { ...resource };
//     this.isEditing = true;
//   }
//
//   onUpdateResource(): void {
//     if (this.selectedResource?.id) {
//       this.resourceService.updateResource(this.selectedResource.id, this.selectedResource).subscribe(
//         () => {
//           this.loadResources();
//           this.onCancelEdit();
//         },
//         (error) => console.error(`Error updating resource: ${error}`)
//       );
//     }
//   }
//
//   onDeleteResource(id: number | undefined): void {
//     if (confirm('Are you sure you want to delete this resource?')) {
//       this.resourceService.deleteResource(id).subscribe(
//         () => this.loadResources(),
//         (error) => console.error(`Error deleting resource: ${error}`)
//       );
//     }
//   }
//
//   onCancelEdit(): void {
//     this.isEditing = false;
//     this.selectedResource = undefined;
//   }
//
//   resetNewResource(): void {
//     this.newResource = {
//       name: '',
//       quantity: 0,
//       type: ResourceType.MATERIAL,
//       provider: '',
//       task: []
//     };
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../../core/services/resource.service';
import { Resource } from '../../../core/models/resource';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { ResourceType } from '../../../core/enums/ResourceType';

@Component({
  selector: 'app-resource-management',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './resource-management.component.html',
  styleUrls: ['./resource-management.component.scss']
})
export class ResourceManagementComponent implements OnInit {

  resources: Resource[] = [];
  selectedResource?: Resource;
  isEditing = false;
  newResource: Resource = {
    name: '',
    quantity: 0,
    type: ResourceType.MATERIAL,
    provider: '',
    taskId: 0
  };

  resourceTypes = ResourceType;

  constructor(private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources(): void {
    this.resourceService.getResources().subscribe(
      (resources) => this.resources = resources,
      (error) => console.error(`Error loading resources: ${error}`)
    );
  }

  onAddResource(): void {
    this.resourceService.addResource(this.newResource).subscribe(
      () => {
        this.loadResources();
        this.resetNewResource();
      },
      (error) => console.error(`Error adding resource: ${error}`)
    );
  }

  onEditResource(resource: Resource): void {
    this.selectedResource = { ...resource };
    this.isEditing = true;
  }

  // onUpdateResource(): void {
  //   if (this.selectedResource?.id) {
  //     this.resourceService.updateResource(this.selectedResource.id, this.selectedResource).subscribe(
  //       () => {
  //         this.loadResources();
  //         this.onCancelEdit();
  //       },
  //       (error) => console.error(`Error updating resource: ${error}`)
  //     );
  //   }
  // }
  onUpdateResource(): void {
    if (this.selectedResource?.id) {
      console.log('Resource to update:', this.selectedResource);
      this.resourceService.updateResource(this.selectedResource.id, this.selectedResource).subscribe(
        () => {
          this.loadResources();
          this.onCancelEdit();
        },
        (error) => console.error(`Error updating resource: ${error}`)
      );
    }
  }


  onDeleteResource(id: number | undefined): void {
    if (confirm('Are you sure you want to delete this resource?')) {
      this.resourceService.deleteResource(id).subscribe(
        () => this.loadResources(),
        (error) => console.error(`Error deleting resource: ${error}`)
      );
    }
  }

  onCancelEdit(): void {
    this.isEditing = false;
    this.selectedResource = undefined;
  }

  resetNewResource(): void {
    this.newResource = {
      name: '',
      quantity: 0,
      type: ResourceType.MATERIAL,
      provider: '',
      taskId: 0
    };
  }
}
