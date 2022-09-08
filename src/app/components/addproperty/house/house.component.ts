import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { contract, expand, Option } from '../../../shared/shared'
import { InteractionService } from 'src/app/services/shared-data.service';


declare let Swal: any 

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
  
export class HouseComponent implements OnInit {
  innerWidth: any
  sideIsClosed!:boolean
  expand = expand
  contract: any
 

  constructor(private http:HttpClient, private interactionService: InteractionService) { }
  ngOnInit(): void {
    this.innerWidth = window.innerWidth
    this.interactionService.sidebarIsopen$.subscribe(
      message => {
        this.sideIsClosed = !message
      }
    ) 
  }

  @Input() opened: String = "Property Type" 
  @Output() event = new EventEmitter()
  report: any
  success:boolean=false


  closeSidebar() {
    if(this.innerWidth <720)
      this.interactionService.toggleSidebar(false)
      this.interactionService.toggleDrawer(false)
  }

  rent_frequency: Option[] = [
    {value: 'MONTHLY', viewValue: 'Monthly'},
    {value: 'QUARTELY', viewValue: 'Quartely'},
    {value: 'ANNUALLY', viewValue: 'Anually'},
  ];

  property_status: Option[] = [
    {value: 'COMPLETED', viewValue: 'Completed'},
    {value: 'INCOMPLETE', viewValue: 'InComplete'}
  ];

  ownership_type: Option[] = [
    {value: 'INDIVIDUAL', viewValue: 'Individual'},
    {value: 'ORGANIZATION', viewValue: 'Organization'},
  ];

  property_type: Option[] = [
    {value: 'APARTMENT', viewValue: 'Apartment'},
    {value: 'BUNGALOW', viewValue: 'Bungalow'},
  ];

  property_purpose: Option[] = [
    {value: 'RENT', viewValue: 'Rent'},
    {value: 'SALE', viewValue: 'Sale'},
  ];

  addPropertyForm = new FormGroup({
    propertyManagerID: new FormControl('', [Validators.required]),
    propertyCode: new FormControl('', [Validators.required]),
    propertyName: new FormControl('', [Validators.required]),
    referenceNumber: new FormControl('', [Validators.required]),
    propertyDescription: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    ownershipType: new FormControl('', [Validators.required]),
    propertyAddress: new FormControl('', [Validators.required]),
    propertyStatus: new FormControl('', [Validators.required]),
    propertyPurpose: new FormControl('', [Validators.required]),
    rentFrequency: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    coverPhoto: new FormControl('',),
    coverVideo: new FormControl('',),
    contactName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    emailAddress: new FormControl('', [Validators.required]),
    propertyType:new FormControl('', [Validators.required]),

  })


  saveProperty() {
    //let data=test
    let data = this.addPropertyForm.value;
   
    this.http.post("http://178.79.146.213:8080/smart-real-estate-backend/properties/create",data)
    .subscribe(Result => {
     // console.log(Result)
      this.report = Result
      this.success = this.report.success
      this.report = this.report.message
      console.log(this.success)
      if (this.success) {
        Swal.fire(
       'Success!',
        this.report,
       'success'
     )
     } else if (!this.success) {
       Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: this.report,
       })
     } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a>Why do I have this issue?</a>'
      })
     }
     })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log(this.innerWidth)
    this.innerWidth = window.innerWidth;
    this.contract =  this.innerWidth > 720 ? contract : expand
  }

  closeForm(){
    this.event.emit(this.opened)
  }

  resetForm() {
    alert("coming soon")  
  }

}
