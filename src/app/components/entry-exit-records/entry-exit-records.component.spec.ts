import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryExitRecordsComponent } from './entry-exit-records.component';

describe('EntryExitRecordsComponent', () => {
  let component: EntryExitRecordsComponent;
  let fixture: ComponentFixture<EntryExitRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryExitRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryExitRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
