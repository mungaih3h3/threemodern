
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, Input, ElementRef, ViewChild, PipeTransform, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { contract, expand, Invoice, Property, Unit } from 'src/app/shared/shared';
import { InteractionService } from 'src/app/services/shared-data.service';

export let details: any[] = []
/*
function search(text: string, pipe: PipeTransform): any[] {
   return details.filter(detail => {
    return detail.invoices.filter((invoice: { currentReading: any; currentWaterCost: any; invoiceAmount: any; invoiceMessage: string; invoiceNumber: string; invoiceStatus: string; lastReading: any; monthlyRent: any; previousRentBalance: any; previousWaterBalance: any; rentPayable: any; totalPayable: any; unitCode: string; unitsUsed: string; waterCostPayable: any; waterCostPerUnit: any; }) => {
      const term = text.toLowerCase();
      pipe.transform(invoice.currentReading).includes(term)
      || pipe.transform(invoice.currentWaterCost).includes(term)
      || pipe.transform(invoice.invoiceAmount).includes(term)
      || invoice.invoiceMessage.toLowerCase().includes(term)
      || invoice.invoiceNumber.toLowerCase().includes(term)
      || invoice.invoiceStatus.toLowerCase().includes(term)
      || pipe.transform(invoice.lastReading).includes(term)
      || pipe.transform(invoice.monthlyRent).includes(term)
      || pipe.transform(invoice.previousRentBalance).includes(term)
      || pipe.transform(invoice.previousWaterBalance).includes(term)
      || pipe.transform(invoice.rentPayable).includes(term)
      || pipe.transform(invoice.totalPayable).inclues(term)
      || invoice.unitCode.toLowerCase().includes(term)
      || invoice.unitsUsed.toLowerCase().includes(term)
      || pipe.transform(invoice.waterCostPayable).includes(term)
      || pipe.transform(invoice.waterCostPerUnit).includes(term)
    }
    )  
  });
}
*/

//nested filtering
@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
  providers: [DecimalPipe]
})

  
export class InvoicesComponent implements OnInit {
  filename:string= 'smart-estate-invoice-details'
  opened: boolean = false
  open: boolean = false
  details: boolean = false 
  action: boolean = false
  create:boolean= false
  columns: string[]= ['Invoice Number', 'Invoice Status', 'Monthly Rent', 'Total Payable', 'Units Used']
  now = new Date()
 // invoices$: Observable<Invoice[]>
  filter = new FormControl('')
  data: any
  details$!: any[];
  units!: Unit[];
  tenants!: any[]
  @ViewChild('invoicestb', { static: false }) el!: ElementRef
  outerIndex: any
  innerIndex: any 
  innerWidth: any
  sideIsClosed!:boolean
  expand = expand
  contract: any
 


  constructor(private http: HttpClient, pipe: DecimalPipe, private interactionService: InteractionService) { 
     //this.refreshUnits()
    /* this.details$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(text, pipe))
    ); */
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth
    this.getTenants()
    this.getUnits()
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

  OpenBillForm(){
    this.open=true
  }

  toggleCreate() {
    this.create= !this.create
  }

  openInvoiceForm(){
    this.opened=true
  }

  restoreAfterInvoice($event: boolean) {
    this.opened = $event;
  }

  restoreAfterBill($event: boolean) {
    this.open = $event;
  }

  restoreAfterDetails( $event: boolean) {
    this.details= $event
  }
  
  toggleActions() {
    this.action= !this.action
  } 
  
  openDetails(outer: any, inner: any) {
    this.details = true
    this.outerIndex = outer
    this.innerIndex = inner 
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
  
  automaticInvoiceGeneration() {
    console.log("This is just the beginning, there is more to come")
  }

  getUnits():any{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("propertyID", 1);
    this.http.get("http://178.79.146.213:8080/smart-real-estate-backend/propertyunits/retrieve-propertyunits-by-property",{params:queryParams} )
    .subscribe(Response => {
        this.data = Response;
        this.units = this.data.data
      }
    )
  }

  getTenants():any{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("propertyManagerID", 1);
    this.http.get(" http://178.79.146.213:8080/smart-real-estate-backend/tenancy/retrieve-tenancies-by-propertymanager",{params:queryParams} )
      .subscribe(Response => {
        this.data = Response;
        this.tenants = this.data.data
        this.details$= this.data.data
      }
    )
  }    

  filterByTenant(val: string) {
    this.filter.setValue(val)
  }

  filterByUnit(val: string) {
    this.filter.setValue(val)
  }

}
