import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropertyOwnerFormComponent } from './add-property-owner-form.component';

describe('AddPropertyOwnerFormComponent', () => {
  let component: AddPropertyOwnerFormComponent;
  let fixture: ComponentFixture<AddPropertyOwnerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPropertyOwnerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropertyOwnerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
