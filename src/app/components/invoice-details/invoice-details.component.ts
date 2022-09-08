import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { InteractionService } from 'src/app/services/shared-data.service';
import { contract, expand } from 'src/app/shared/shared';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {
  @Input() data: any[] = []
  @Input() outerIndex: any 
  @Input() innerIndex: any
  filename = 'Monthly Rent Invoice'
  @ViewChild('invoice', { static: false }) el!: ElementRef
  innerWidth: any
  @Output() event = new EventEmitter()
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

  
  closeSidebar() {
    if (this.innerWidth < 720) {
      this.interactionService.toggleSidebar(false)
      this.interactionService.toggleDrawer(false)
    }
      
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log(this.innerWidth)
    this.innerWidth = window.innerWidth;
    this.contract =  this.innerWidth > 720 ? contract : expand
  }

  return() {
    this.event.emit(false)
  }

  printInvoice() {
    let element = this.el.nativeElement;
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




}
