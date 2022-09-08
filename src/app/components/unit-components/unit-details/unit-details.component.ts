import { Component, OnInit, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { InteractionService } from 'src/app/services/shared-data.service';
import { contract, expand, Unit } from 'src/app/shared/shared';

@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrls: ['./unit-details.component.css']
})
export class UnitDetailsComponent implements OnInit {
  selector:string =''
  @Output() event = new EventEmitter()
  @Input() units: any;
  @Input() index: any;
  innerWidth: any
  sideIsClosed!:boolean
  expand = expand
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

  closeSidebar() {
    if (this.innerWidth < 720) {
      this.interactionService.toggleSidebar(false)
      this.interactionService.toggleDrawer(false)
    }
      


    
      
  }

  return() {
    this.event.emit(this.selector)
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log(this.innerWidth)
    this.innerWidth = window.innerWidth;
    this.contract =  this.innerWidth > 720 ? contract : expand
  }

  showTenants() {
    this.selector='tenants'
  }

}
