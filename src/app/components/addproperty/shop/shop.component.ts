import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() opened: String = 'Property'
  @Output() event = new EventEmitter()

  closeForm(){
    this.event.emit(this.opened)
  }

  resetForm() {
    alert("coming soon")  
  }
}
