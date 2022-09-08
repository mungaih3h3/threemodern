import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantApplicationFormComponent } from './tenant-application-form.component';

describe('TenantApplicationFormComponent', () => {
  let component: TenantApplicationFormComponent;
  let fixture: ComponentFixture<TenantApplicationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantApplicationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
