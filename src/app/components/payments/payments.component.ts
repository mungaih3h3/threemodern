import { Component, OnInit, ElementRef, ViewChild, Input, EventEmitter, Output, PipeTransform, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { contract, expand, Payment } from 'src/app/shared/shared';
import { DecimalPipe } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { InteractionService } from 'src/app/services/shared-data.service';

export let payments: Payment[] = []
  payments = [
    {
      unit: "L1 Unit",
      invoice: "number 001",
      amount: "10000"
    },
    
    {
      unit: "L26 Unit",
      invoice: "number 002",
      amount: "10000"
    },

    {
      unit: "L38 unit",
      invoice: "number 001",
      amount: "10000"
    }
  ]

function search(text: string, pipe: PipeTransform): Payment[] {
  return payments.filter(payment => {
    const term = text.toLowerCase();
    return payment.unit.toLowerCase().includes(term)
      || payment.invoice.toLowerCase().includes(term)
      || pipe.transform(payment.amount).includes(term)
    
  });
} 

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  providers: [DecimalPipe]
})
  
  
export class PaymentsComponent implements OnInit {
  searchText = '';
  payments$: Observable<Payment[]>;
  filter = new FormControl('')
  sideIsClosed!:boolean
  expand = expand
  contract: any

  constructor(public router: Router, pipe:DecimalPipe, private interactionService: InteractionService) { 
    this.payments$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text => search(text, pipe))
      ))
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth
    this.interactionService.sidebarIsopen$.subscribe(
      message => {
        this.sideIsClosed = !message
      }
    ) 
  }
  query: string= ""
  innerWidth: any
  @Input() searchTerm:String=''
  opened: boolean = false
  @Output() event= new EventEmitter()
  @ViewChild('paymentstb', { static: false }) el!: ElementRef 
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

  sendQuery() {
    this.event.emit(this.query)
  }
  search() {
    this.event.emit(this.query)
  }
  filename: string = 'smart-estate-units-details'
  columns: string[]= ['#', 'Unit', 'Unit Status','Status', 'Rent Deposit', 'Monthly Rent', 'Elect Meter', 'Water Meter', 'Service Fee']

  openForm() {
    this.opened=true
  }

  restoreAfterForm($event: boolean) {
    this.opened = $event;
  }

  operateOnTable($event: any) {
    console.log($event)
    if ($event == 'Copy') 
      this.copyTable()
    else if ($event == 'Csv')
      this.generateCsv()
    else if ($event == 'Excel')
      this.generateExcel()
    else if ($event == 'Pdf')
      this.generatePdf()
    else if($event == 'Print')
      this.printTable()
  }


  toggleActions() {
    
  }





  copyTable() {
    console.log('I am copying  the table')
  }

  generateCsv() {
    console.log('I am generating csv')
  }

  generateExcel() {
    let element= this.el.nativeElement;
    const worksheet: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(workbook, this.filename+'.xlsx');
  }

  generatePdf() {
    let pdf = new jsPDF('p', 'pt', [1000,1000])
    pdf.html(this.el.nativeElement, {
      callback: () => {
        pdf.save(this.filename)
      }
    })
  }

  printTable() {
    let element= this.el.nativeElement;  
    let newWin = window.open(this.filename);  
    newWin?.document.write(element.outerHTML);  
    newWin?.print();  
    newWin?.close();
  }


}

