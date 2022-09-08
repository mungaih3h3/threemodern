import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }
  choice: String = '' 

  @Input() columns: string[] = [];
  showColumn: Boolean = false
  
  @Output() event = new EventEmitter()
  
  actOnTable() {
    let e=window.event
    let el = e?.target as HTMLElement
    this.event.emit(el.innerText)
  }

  filterTable() {
    this.event.emit(this.choice)
  }

  showColumns() {
    if(this.showColumn)
      this.showColumn = false 
    else 
      this.showColumn = true
  }












}
