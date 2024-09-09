import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCustomerComponent } from './dash-customer.component';

describe('DashCustomerComponent', () => {
  let component: DashCustomerComponent;
  let fixture: ComponentFixture<DashCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
