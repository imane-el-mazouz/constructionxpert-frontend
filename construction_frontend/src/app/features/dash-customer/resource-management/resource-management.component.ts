import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Resource} from "../../../core/models/resource";
import {ResourceService} from "../../../core/services/resource.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-resource-management',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './resource-management.component.html',
  styleUrl: './resource-management.component.scss'
})
export class ResourceManagementComponent {

  resources: Resource[] = [];
  selectedResource?: Resource;
  isEditing = false;
  newResource: Resource = {
    name: '',
    quantity: 0,
    type: 'MATERIAL',
    provider: '',
    task: []
  };

  constructor(private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources(): void {
    this.resourceService.getResources().subscribe(
      (resources) => this.resources = resources,
      (error) => console.error('Erreur lors du chargement des ressources', error)
    );
  }

  onAddResource(): void {
    this.resourceService.addResource(this.newResource).subscribe(
      () => {
        this.loadResources();
        this.newResource = {
          name: '',
          quantity: 0,
          type: 'MATERIAL',
          provider: '',
          task: []
        };
      },
      (error) => console.error('Erreur lors de l\'ajout de la ressource', error)
    );
  }

  onEditResource(resource: Resource): void {
    this.selectedResource = { ...resource };
    this.isEditing = true;
  }

  onUpdateResource(): void {
    if (this.selectedResource && this.selectedResource.id) {
      this.resourceService.updateResource(this.selectedResource.id, this.selectedResource).subscribe(
        () => {
          this.loadResources();
          this.selectedResource = undefined;
          this.isEditing = false;
        },
        (error) => console.error('Erreur lors de la mise à jour de la ressource', error)
      );
    }
  }

  onDeleteResource(id: number | undefined): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette ressource ?')) {
      this.resourceService.deleteResource(id).subscribe(
        () => this.loadResources(),
        (error) => console.error('Erreur lors de la suppression de la ressource', error)
      );
    }
  }

  onCancelEdit(): void {
    this.isEditing = false;
    this.selectedResource = undefined;
  }
}
