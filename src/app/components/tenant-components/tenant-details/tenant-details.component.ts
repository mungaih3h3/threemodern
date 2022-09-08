import { Component, OnInit, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { InteractionService } from 'src/app/services/shared-data.service';
import { contract, expand } from 'src/app/shared/shared';


@Component({
  selector: 'app-tenant-details',
  templateUrl: './tenant-details.component.html',
  styleUrls: ['./tenant-details.component.css']
})
export class TenantDetailsComponent implements OnInit {
  @Output() event = new EventEmitter()
  @Input() tenant: any
  @Input() index: any
  innerWidth: any
  sideIsClosed!:boolean
  expand = expand
  contract: any

  constructor(private interactionService:InteractionService) { }
  ngOnInit(): void {
    console.log(this.tenant)
    console.log(this.index)
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

  closeSidebar() {
    if (this.innerWidth < 720) {
      this.interactionService.toggleSidebar(false)
      this.interactionService.toggleDrawer(false)
    }
  }

  return() {
    this.event.emit()
  }
}
