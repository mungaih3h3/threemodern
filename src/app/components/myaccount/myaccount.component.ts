import { Component, HostListener, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  drawerIsOpen!: boolean;
  innerWidth: any
  constructor(private interactivityService:InteractionService) { }

  ngOnInit(): void {
    this.innerWidth= window.innerWidth
    this.interactivityService.accDrawerIsopen$.subscribe(
      message => {
        this.drawerIsOpen = message
      }
    )
    if (this.innerWidth > 720) 
      this.drawerIsOpen=true
    else
      this.drawerIsOpen=false
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log(this.innerWidth)
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 720)
      this.drawerIsOpen = false
  }


  

  











}
