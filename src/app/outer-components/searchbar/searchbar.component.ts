import { Component, OnInit,Output, EventEmitter, HostListener } from '@angular/core';
import { InteractionService } from 'src/app/services/shared-data.service';
import { contract, expand } from 'src/app/shared/shared';
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  
  query: String = ""
  toggle_sideBar: String= 'togglesidebar'
  open_drawer:String= 'toggledrawer'
  open_notify: String = 'opennotify'
  open_messages: String= 'openmessages'
  @Output() event = new EventEmitter()
  sideBarIsOpen: boolean = true
  sideIsClosed!:boolean
  expand = expand
  innerWidth: any
  contract: any
 
  
  constructor(private interactionService: InteractionService) { }
  ngOnInit(): void {
    this.innerWidth = window.innerWidth
    this.interactionService.sidebarIsopen$.subscribe(
      message => {
        this.sideIsClosed = !message
      }
    ) 
  }
  


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log(this.innerWidth)
    this.innerWidth = window.innerWidth;
    this.contract =  this.innerWidth > 720 ? contract : expand
  }
  
  openDrawer() {
    this.interactionService.toggleDrawer(true)
  }

  toggleSidebar() {
    this.sideBarIsOpen= !this.sideBarIsOpen
    this.interactionService.toggleSidebar(this.sideBarIsOpen)
  }

  sendQuery() {
    this.event.emit(this.query)
  }

  openNotify(){
    this.event.emit(this.open_notify)
  }

  doc = document.documentElement;
  toggleFullscreen() {
    if(this.doc.requestFullscreen)
      this.doc.requestFullscreen();
    if (document.exitFullscreen)
     document.exitFullscreen()

  }

  search() {
    this.event.emit(this.query)
  }

  openMessages() {
    this.event.emit(this.open_messages)
  }
}
