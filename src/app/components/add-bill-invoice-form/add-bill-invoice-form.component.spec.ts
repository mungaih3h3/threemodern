import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillInvoiceFormComponent } from './add-bill-invoice-form.component';

describe('AddBillInvoiceFormComponent', () => {
  let component: AddBillInvoiceFormComponent;
  let fixture: ComponentFixture<AddBillInvoiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBillInvoiceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBillInvoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
