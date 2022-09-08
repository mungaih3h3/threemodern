import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InteractionService } from 'src/app/services/shared-data.service';
import {Unit, Option, Property, expand, contract} from '../../../shared/shared'

const units: Unit[] = []
declare let Swal: any 

@Component({
  selector: 'app-add-unit-form',
  templateUrl: './add-unit-form.component.html',
  styleUrls: ['./add-unit-form.component.css']
})
export class AddUnitFormComponent implements OnInit {
  units!: Unit[]
  data: any
  property!: Property[]
  innerWidth: any
  sideIsClosed!:boolean
  expand = expand
  contract: any
 

  constructor(private http:HttpClient, private interactionService: InteractionService) { }

  @Input() opened: boolean = true 
  @Output() event = new EventEmitter()
  report:any
  success: boolean = false
  
  ngOnInit(): void {
    this.getProperty()
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

  electricity_share: Option[] = [
    {value: 'INDIVIDUAL', viewValue: 'Individual'},
    {value: 'SHARED', viewValue: 'Shared'},
  
  ];

  water_share: Option[] = [
    {value: 'INDIVIDUAL', viewValue: 'Individual'},
    {value: 'SHARED', viewValue: 'Shared'}
  ];

  unit_status: Option[] = [
    {value: 'VACANT', viewValue: 'Vacant'},
    {value: 'OCCUPIED', viewValue: 'Occupied'}
  ];

  addUnitForm = new FormGroup({
    propertyID: new FormControl('',[Validators.required]),
    unitCode: new FormControl('',[Validators.required]),
    unitName: new FormControl('',[Validators.required]),
    unitDescription: new FormControl('',[Validators.required]),
    rentAmount: new FormControl('',[Validators.required]),
    rentDepositAmount: new FormControl('',[Validators.required]),
    electricityMeter: new FormControl('',[Validators.required]),
    waterMeter: new FormControl('', [Validators.required]),
    electricityMeterShare: new FormControl('',[Validators.required]),
    waterMeterShare: new FormControl('',[Validators.required]),
    unitStatus: new FormControl('',[Validators.required]),
  })
  /*
  test= {
    "propertyID":1,
    "unitCode":"L10",
    "unitName":"L9-2BEDROOM",
    "unitDescription":"A Spacious self contained 2 Bedrom with a Balcony, Washroom and a Spacious Kitchen",
    "rentAmount":22000,
    "rentDepositAmount":22000,
    "electricityMeter":"123456",
    "waterMeter":"123456",
    "electricityMeterShare":"INDIVIDUAL",
    "waterMeterShare":"INDIVIDUAL",
    "unitStatus":"OCCUPIED"
  }*/

  saveUnit() {
     //let data=this.test
     let data = this.addUnitForm.value;
     this.http.post("http://178.79.146.213:8080/smart-real-estate-backend/propertyunits/create",data)
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
  

  getProperty():any{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("propertyManagerID", 1);
    this.http.get("http://178.79.146.213:8080/smart-real-estate-backend/properties/find-by-propertymanager",{params:queryParams} )
    .subscribe(Response => {
       // console.log(Response)
        this.data = Response;
        this.property = this.data.data
       // console.log(this.property)
      }
    )
  }

  closeForm(){
    this.opened = false
    this.event.emit(this.opened)
  }

  openForm(){
    this.opened=true
  }

  resetForm() {
    this.addUnitForm.reset()  
  }
}
