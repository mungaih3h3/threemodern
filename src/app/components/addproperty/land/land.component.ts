import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-land',
  templateUrl: './land.component.html',
  styleUrls: ['./land.component.css']
})
export class LandComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  @Input() opened: String = 'Property Types' 
  @Output() event = new EventEmitter()

  closeForm() {
    this.event.emit(this.opened)
  }

  resetForm() {
    alert("coming soon")  
  }

}
