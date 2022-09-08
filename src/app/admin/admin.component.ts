import { Component, HostListener, OnInit } from '@angular/core';
import { InteractionService } from '../services/shared-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  sideBarIsopen: Boolean= true;
  drawerIsOpen: boolean = false;
  topbarIsopen: boolean = false;
  notifyIsOpen: boolean = false;
  msgsIsOpen: boolean = false;
  search_term: String= ''
  option: String = ''
  innerWidth: any
  hideAccDrawer: boolean =true;

  constructor(private interactionService: InteractionService) {

   }

  ngOnInit(): void {
    this.innerWidth =window.innerWidth
    this.interactionService.sidebarIsopen$.subscribe(
      message => {
        this.sideBarIsopen= message
      }
    )
    this.interactionService.drawerIsopen$.subscribe(
      message => {
        this.drawerIsOpen = message
        if(this.innerWidth < 720)
          this.sideBarIsopen= false
      }
    )
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log(this.innerWidth)
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 720)
      this.sideBarIsopen = false
    else 
      this.sideBarIsopen = true
  }

  closeDrawer($event: String) {
     this.drawerIsOpen = false
    if ($event.length > 1) {
      this.sideBarIsopen = false  
    }
  }

  toggleSideBar($event: any) {
    console.log($event)
    this.sideBarIsopen = $event
    this.sideBarIsopen=!this.sideBarIsopen
  }

  onOutletLoaded(component:any) {
    component.sideBarIsopen = this.sideBarIsopen;
  } 

  performAction($event: any){
    switch($event){
      case 'opendrawer':
        if(this.notifyIsOpen)
          this.notifyIsOpen=false
        this.drawerIsOpen = $event
        break
      case 'opennotify':
        if(this.notifyIsOpen==$event)
        this.notifyIsOpen= false
        else
        this.notifyIsOpen= $event
        break
      case 'openmessages':
        if(this.msgsIsOpen==$event)
        this.msgsIsOpen= false
          else
          this.msgsIsOpen= $event
        break
      case 'togglesidebar':
        this.sideBarIsopen = !this.sideBarIsopen
        this.hideAccDrawer= !this.hideAccDrawer
        break;
      
      default: 
        this.search_term= $event
  
  }
  }
  




 
  




  

}
