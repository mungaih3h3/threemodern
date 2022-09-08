import { InteractivityChecker } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-display-settings',
  templateUrl: './display-settings.component.html',
  styleUrls: ['./display-settings.component.css']
})
export class DisplaySettingsComponent implements OnInit {

  dark: boolean= false
  constructor(private interactivityService: InteractionService) { }
  ngOnInit(): void { }
  toggleDark() {
    this.dark= !this.dark
    this.interactivityService.toggleDarkMode(this.dark)  
  }
    
  }














