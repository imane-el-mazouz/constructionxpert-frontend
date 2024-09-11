import { Component } from '@angular/core';
import { Customer } from "../../../core/models/customer";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AdminService } from "../../../core/services/admin.service";
import { NgForOf, NgIf } from "@angular/common";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatList, MatListItem, MatListModule} from "@angular/material/list";
import {MatLine, MatLineModule} from "@angular/material/core";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-customers-management',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    MatIconModule,
    MatIconButton,
    MatListItem,
    MatLineModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './customers-management.component.html',
  styleUrls: ['./customers-management.component.scss']
})
export class CustomersManagementComponent {
  customers: Customer[] = [];
  customerForm: FormGroup;
  editingCustomer: Customer | null = null;
  showAddForm: boolean = false;

  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      id: [''],
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      password: [''],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.adminService.getCustomers().subscribe(
      (data) => {
        this.customers = data;
        console.log('Loaded customers:', this.customers);
      },
      (error) => console.error('Error loading customers', error)
    );
  }


  editCustomer(customer: Customer): void {
    this.editingCustomer = customer;
    this.showAddForm = false;
    this.customerForm.patchValue(customer);
  }

  saveCustomer(): void {
    if (this.customerForm.valid) {
      const customer = this.customerForm.value;
      if (customer.id) {
        this.adminService.updateCustomer(customer).subscribe(
          () => {
            this.loadCustomers();
            this.cancelEdit(); // Hide form after saving
          },
          (error) => console.error('Error updating customer', error)
        );
      } else {
        this.adminService.createCustomer(customer).subscribe(
          () => {
            this.loadCustomers();
            this.cancelEdit();
          },
          (error) => console.error('Error creating customer', error)
        );
      }
    }
  }

  deleteCustomer(id: number): void {
    if (id == null) {
      console.error('Customer ID is null or undefined');
      return;
    }
    if (confirm('Are you sure you want to delete this customer?')) {
      this.adminService.deleteCustomer(id).subscribe(
        () => this.loadCustomers(),
        (error) => console.error('Error deleting customer', error)
      );
    }
  }


  cancelEdit(): void {
    this.customerForm.reset();
    this.editingCustomer = null;
    this.showAddForm = false;
  }
}
