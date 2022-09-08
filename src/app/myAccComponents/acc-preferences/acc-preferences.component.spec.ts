import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccPreferencesComponent } from './acc-preferences.component';

describe('AccPreferencesComponent', () => {
  let component: AccPreferencesComponent;
  let fixture: ComponentFixture<AccPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccPreferencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
