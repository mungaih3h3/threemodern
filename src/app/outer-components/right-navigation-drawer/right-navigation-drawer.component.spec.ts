import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightNavigationDrawerComponent } from './right-navigation-drawer.component';

describe('RightNavigationDrawerComponent', () => {
  let component: RightNavigationDrawerComponent;
  let fixture: ComponentFixture<RightNavigationDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightNavigationDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightNavigationDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
