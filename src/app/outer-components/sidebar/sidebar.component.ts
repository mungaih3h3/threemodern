import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  darkMode: boolean = false
  dark: string = 'sidebar-dark'
  light: string = 'sidebar-light'


  constructor(private interactivityService: InteractionService) { }

  ngOnInit(): void {
    this.interactivityService.darkModeEnabled$.subscribe(
      message => {
        this.darkMode= message
      }
    )
  }








}
