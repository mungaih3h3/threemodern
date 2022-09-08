import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InteractionService } from 'src/app/services/shared-data.service';
import { contract, expand, Option } from '../../shared/shared'


declare let Swal: any;
@Component({
  selector: 'app-add-tenant-form',
  templateUrl: './add-tenant-form.component.html',
  styleUrls: ['./add-tenant-form.component.css']
})
  
  
export class AddTenantFormComponent implements OnInit {
  sideIsClosed!:boolean
  expand = expand
  contract: any
  constructor(private http: HttpClient, private interactionService: InteractionService) { }
  
  ngOnInit(): void {
    this.innerWidth = window.innerWidth
    this.interactionService.sidebarIsopen$.subscribe(
      message => {
        this.sideIsClosed = !message
      }
    ) 

  }

  @Input() opened: boolean = true 
  @Output() event = new EventEmitter()
  report: any
  success: boolean = false
  innerWidth: any

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

  tenant_type: Option[] = [
    {value: 'VERIFIED', viewValue: 'Verified'},
    {value: 'UNVERIFIED', viewValue: 'Unverified' },
  ];

  tenant_status: Option[] = [
    {value: 'ACTIVE', viewValue: 'Active'},
    {value: 'INACTIVE', viewValue: 'Inactive' },
  ];

  registration_mode: Option[] = [
    {value: 'SYSTEMSIGNED', viewValue: 'System Signed'},
    {value: 'PROPERTYMANAGERSIGNED', viewValue: 'Property Manager Signed' },
  ];

  id_type: Option[] = [
    {value: 'NATIONALID', viewValue: 'National ID'},
    {value: 'PASSPORT', viewValue: 'Passport' },
  ];


  addTenantForm = new FormGroup({
    idNumber: new FormControl('',[Validators.required]),
    idType: new FormControl('',[Validators.required]),
    tenantIdentifier: new FormControl('',[Validators.required]),
    firstName: new FormControl('',[Validators.required]),
    middleName: new FormControl('',[Validators.required]),
    otherNames: new FormControl('',[Validators.required]),
    pin: new FormControl('',[Validators.required]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('',[Validators.required]),
    emailAddress: new FormControl('',[Validators.required]),
    vehicleRegistrationNumber: new FormControl('',[Validators.required]),
    tenantType: new FormControl('', [Validators.required]),
    registrationMode:new FormControl('', [Validators.required]),
    tenantStatus: new FormControl('',[Validators.required]),
    occupation: new FormControl('',[Validators.required]),
    profilePhoto: new FormControl('',[Validators.required]),
  })


  /*
  test={
    "idNumber":"30949508",
    "idType":"NATIONALID",
    "tenantIdentifier":"30949506",
    "firstName":"Erick",
    "middleName":"Karanja",
    "otherNames":"Karanja",
    "pin":"PIN-1001",
    "address":"148-10306 Kagio",
    "phoneNumber":"0702432833",
    "emailAddress":"muthike7839@gmail.com",
    "vehicleRegistrationNumber":"KDC 964P",
    "tenantType":"VERIFIED",
    "registrationMode":"SYSTEMSIGNED",
    "tenantStatus":"ACTIVE",
    "occupation":"Software Engineer",
    "profilePhoto":""
  }*/

 
  saveTenant() {
    //let data=this.test 
     let data = this.addTenantForm.value;
     this.http.post("http://178.79.146.213:8080/smart-real-estate-backend/tenants/create",data)
     .subscribe(Result => {
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
  
  closeForm(){
    this.opened = false
    this.event.emit()
  }

  openForm(){
    this.opened=true
  }

  resetForm() {
  }






}
