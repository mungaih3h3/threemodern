import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InteractionService } from 'src/app/services/shared-data.service';
import { contract, expand } from 'src/app/shared/shared';

@Component({
  selector: 'app-add-service-form',
  templateUrl: './add-service-form.component.html',
  styleUrls: ['./add-service-form.component.css']
})
export class AddServiceFormComponent implements OnInit {
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

  @Input() opened: boolean = true;
  addServiceForm = new FormGroup({
    property: new FormControl('',[Validators.required]),
    choice: new FormControl('',[Validators.required]),
    property_unit: new FormControl('',[Validators.required]),
    service_code: new FormControl('',[Validators.required]),
    service_month: new FormControl('',[Validators.required]),
    service_cost: new FormControl('',[Validators.required]),
    service_status: new FormControl('',[Validators.required]),
    pin: new FormControl('', [Validators.required]),
    tel: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
    vehicle_reg: new FormControl('',[Validators.required]),
    date_from: new FormControl('',[Validators.required])
  })


  closeSidebar() {
    if (this.innerWidth < 720) 
      this.interactionService.toggleSidebar(false)  
    
  }

  saveService() {
    alert("The service is saved")
  }


  closeForm(){
    this.opened=false
  }

  openForm(){
    this.opened=true
  }

  resetForm() {
    this.addServiceForm.reset()  
  }
    
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log(this.innerWidth)
    this.innerWidth = window.innerWidth;
    this.contract =  this.innerWidth > 720 ? contract : expand
   
  }







}
