import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantInvoiceFormComponent } from './tenant-invoice-form.component';

describe('TenantInvoiceFormComponent', () => {
  let component: TenantInvoiceFormComponent;
  let fixture: ComponentFixture<TenantInvoiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantInvoiceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantInvoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
