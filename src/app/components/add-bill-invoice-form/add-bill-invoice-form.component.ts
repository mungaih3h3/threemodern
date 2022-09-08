import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InteractionService } from 'src/app/services/shared-data.service';
import { contract, expand } from 'src/app/shared/shared';

@Component({
  selector: 'app-add-bill-invoice-form',
  templateUrl: './add-bill-invoice-form.component.html',
  styleUrls: ['./add-bill-invoice-form.component.css']
})
export class AddBillInvoiceFormComponent implements OnInit {
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

  @Input() open: boolean = false;
  @Output() event = new EventEmitter();

    
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log(this.innerWidth)
    this.innerWidth = window.innerWidth;
    this.contract =  this.innerWidth > 720 ? contract : expand
  }



  addBillInvoiceForm = new FormGroup({
    service: new FormControl('',[Validators.required]),
    account: new FormControl('',[Validators.required]),
    unit: new FormControl('',[Validators.required]),
    tenant_id: new FormControl('',[Validators.required]),
    tenant: new FormControl('',[Validators.required]),
    service_month: new FormControl('',[Validators.required]),
    service_cost: new FormControl('',[Validators.required]),
    service_status: new FormControl('', [Validators.required]),
  })

  closeSidebar() {
    if (this.innerWidth < 720) {
      this.interactionService.toggleSidebar(false)
      this.interactionService.toggleSidebar(false)
    }  
  }

  saveBillInvoice() {
    alert("The service is saved")
  }

  closeForm(){
    this.open = false
    this.event.emit(this.open)
  }

  openForm(){
    this.open=true
  }

  resetForm() {
    this.addBillInvoiceForm.reset()  
  }


}
