import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/services/shared-data.service';
import { contract, expand } from 'src/app/shared/shared';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [DecimalPipe]
})
export class SettingsComponent implements OnInit {
  settingsType: string = 'notifications';
  innerWidth!: any 
  sideIsClosed!:boolean
  expand = expand
  contract: any

  constructor(private http: HttpClient, pipe: DecimalPipe, private interactionService: InteractionService) { }
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

  
  closeSidebar() {
    if (this.innerWidth < 720) {
      this.interactionService.toggleSidebar(false)
      this.interactionService.toggleDrawer(false)
    }
      
  }


  selectSettings(arg: string) {
   this.settingsType = arg
  }














}
