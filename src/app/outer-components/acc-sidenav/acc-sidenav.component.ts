import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-acc-sidenav',
  templateUrl: './acc-sidenav.component.html',
  styleUrls: ['./acc-sidenav.component.css']
})
export class AccSidenavComponent implements OnInit {

  constructor(private interactivityService: InteractionService) {


  }

  ngOnInit(): void {
  }

  closeDrawer() {
    this.interactivityService.toggleAccDrawer(false)
    
  }





  
}
