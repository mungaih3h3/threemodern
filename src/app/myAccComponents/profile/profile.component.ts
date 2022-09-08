import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  accSidebarIsopen:boolean =false
  constructor(private interactivityService: InteractionService) { }

  ngOnInit(): void {
   
    
  }

  account_info = [
    {
      names: 'Yousir User',
      publicName: 'Yousir User',
      category: 'Property Sales',
      organization: 'Smart Estates Holdings',
      location: 'Nairobi, Kenya'
    }
  ]


  toggleSidebar() {
    this.accSidebarIsopen = !this.accSidebarIsopen
    this.interactivityService.toggleAccDrawer(this.accSidebarIsopen)
    console.log(this.accSidebarIsopen)
    console.log('the function is executed')
  }










  

}
