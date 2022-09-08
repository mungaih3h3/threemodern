import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccSidenavComponent } from './acc-sidenav.component';

describe('AccSidenavComponent', () => {
  let component: AccSidenavComponent;
  let fixture: ComponentFixture<AccSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
