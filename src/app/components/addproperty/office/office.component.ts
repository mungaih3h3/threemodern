import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() opened: String = "Property Type"
  @Output() event = new EventEmitter()

  closeForm(){
    this.event.emit(this.opened)
  }

  resetForm() {
    alert("coming soon")  
  }

}
