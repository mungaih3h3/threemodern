import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-right-navigation-drawer',
  templateUrl: './right-navigation-drawer.component.html',
  styleUrls: ['./right-navigation-drawer.component.css']
})
export class RightNavigationDrawerComponent implements OnInit {
  isRightDrawerOpen: boolean = false;

  @Output() event = new EventEmitter()
  constructor() { }
  ngOnInit(): void {
  }

  
  closeDrawer() {
    let e=window.event
    let route = e?.target as HTMLElement
    this.event.emit(route.innerText)
    
  }


}
