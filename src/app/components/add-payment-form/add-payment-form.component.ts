import { Component, OnInit, Output,EventEmitter, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InteractionService } from 'src/app/services/shared-data.service';
import { contract, expand } from 'src/app/shared/shared';

@Component({
  selector: 'app-add-payment-form',
  templateUrl: './add-payment-form.component.html',
  styleUrls: ['./add-payment-form.component.css']
})
export class AddPaymentFormComponent implements OnInit {
  sideIsClosed!:boolean
  expand = expand
  contract: any
  innerWidth: any
  constructor(private interactionService: InteractionService) { }
  ngOnInit(): void {
    this.innerWidth = window.innerWidth
    this.interactionService.sidebarIsopen$.subscribe(
      message => {
        this.sideIsClosed = !message
      }
    ) 
  }
  
  opened: boolean = true
  title:String="Add Payment"
  @Output() event = new EventEmitter()
  addPaymentForm = new FormGroup({
    property: new FormControl('', [Validators.required]),
    property_unit: new FormControl('', [Validators.required]),
    tenant: new FormControl('', [Validators.required]),
    payment_mode: new FormControl('', [Validators.required]),
    pay_date: new FormControl('', [Validators.required]),
    service_cost: new FormControl('', [Validators.required]),
    service_status: new FormControl('', [Validators.required]),

  })

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

  
  savePayment() {
    alert("The payment is saved")
  }

  closeForm() {
    this.opened = false
    this.event.emit(this.opened)
  }

  openForm() {
    this.opened=true
  }

  resetForm() {
    this.addPaymentForm.reset()
  }
}
