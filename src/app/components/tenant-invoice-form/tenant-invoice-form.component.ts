import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InteractionService } from 'src/app/services/shared-data.service';
import { contract, expand } from 'src/app/shared/shared';

interface TenantInvoice{
  property: string;
  property_unit: string;
  tenant: string;
  unit_rent: string
  rent_deposit: string
  elect_bill: string
  service_fee: string
  id: string
  names: string
  pin: string
  tel: string
  address: string
  invoice_month: string
  invoice_type: string
}
@Component({
  selector: 'app-tenant-invoice-form',
  templateUrl: './tenant-invoice-form.component.html',
  styleUrls: ['./tenant-invoice-form.component.css']
})
  
export class TenantInvoiceFormComponent implements OnInit {
  @ViewChild('invoice', { static: false }) el!: ElementRef
  filename = 'Monthly Rent Invoice'
  now = new Date
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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log(this.innerWidth)
    this.innerWidth = window.innerWidth;
    this.contract =  this.innerWidth > 720 ? contract : expand
  }

  
  @Input() opened: boolean = true   
  @Output() event= new EventEmitter()
  addTenantInvoiceForm = new FormGroup({
    property: new FormControl('',[Validators.required]),
    property_unit: new FormControl('',[Validators.required]),
    tenant: new FormControl('',[Validators.required]),
    unit_rent: new FormControl('',[Validators.required]),
    rent_deposit: new FormControl('',[Validators.required]),
    elect_bill: new FormControl('',[Validators.required]),
    service_fee: new FormControl('',[Validators.required]),
    id: new FormControl('', [Validators.required]),
    names: new FormControl('',[Validators.required]),
    pin: new FormControl('',[Validators.required]),
    tel: new FormControl('',[Validators.required]),
    address: new FormControl('', [Validators.required]),
    invoice_month: new FormControl('', [Validators.required]),
    invoice_type: new FormControl('', [Validators.required])
  })

  closeSidebar() {
    if (this.innerWidth < 720) {
      this.interactionService.toggleSidebar(false)
      this.interactionService.toggleDrawer(false)
    }
      
  }

  content=this.addTenantInvoiceForm.value;
  printInvoice() {
    let element = this.el.nativeElement;
    this.content = this.addTenantInvoiceForm.value 
    console.log(this.content.property)
    let newWin = window.open(this.filename); 
    let windowContent = '<!DOCTYPE html>';
    //Starting HTML Tags
    windowContent += '<html>'
    
    //Setting Print Page Title
    windowContent += `<head> 
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <style>
          .no-print{
            display: none !important;
          }
          img{
            height:25px !important;
            width: 60px !important;
            margin-right: 5px !important;
          }

          h4 span{
            color: red !important;
          }

          .top-content, bottom-content{
            display: flex;
            align-items: center;
          }

          .top-content{
            justify-content: space-between;
          }

          .bottom-content{
            justify-content: flex-start;
          }
        </style>
      </head > `;
    
    //Starting Body Tag
    windowContent += '<body>'
    
    //Getting Div HTML
    windowContent += element.outerHTML;
    
    //Closing Body Tag and HTML Tag
    windowContent += '</body>';
    windowContent += '</html>';

    newWin?.document.write(windowContent);  
    newWin?.print();  
  }

  saveTenantInvoice() {
    const content=this.addTenantInvoiceForm.value
  }

  closeForm(){
    this.opened = false
    this.event.emit(this.opened)
  }

  openForm(){
    this.opened=true
  }

  resetForm() {
    this.addTenantInvoiceForm.reset()  
  }

}
