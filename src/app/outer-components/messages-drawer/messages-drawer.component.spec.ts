import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesDrawerComponent } from './messages-drawer.component';

describe('MessagesDrawerComponent', () => {
  let component: MessagesDrawerComponent;
  let fixture: ComponentFixture<MessagesDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
