import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTenantFormComponent } from './add-tenant-form.component';

describe('AddTenantFormComponent', () => {
  let component: AddTenantFormComponent;
  let fixture: ComponentFixture<AddTenantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTenantFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTenantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
