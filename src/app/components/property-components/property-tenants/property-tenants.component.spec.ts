import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTenantsComponent } from './property-tenants.component';

describe('PropertyTenantsComponent', () => {
  let component: PropertyTenantsComponent;
  let fixture: ComponentFixture<PropertyTenantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyTenantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyTenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
