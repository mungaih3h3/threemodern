import { DecimalPipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import jsPDF from 'jspdf';
import { filter } from 'rxjs';
import { InteractionService } from 'src/app/services/shared-data.service';
import { expand, Unit } from 'src/app/shared/shared';
import * as XLSX from 'xlsx';


interface Statement{
  date: string;
  tenant: string;
  description: string;
  debit: string;
  credit: string;
  balance: string;  
}

export let statements: Statement[]

statements = [
  {
    date: 'data data',
    tenant: 'tenant 1',
    description: 'first statement',
    debit: 'data data',
    credit: 'data data',
    balance: 'data data', 
  },
  {
    date: 'data data',
    tenant: 'tenant 2',
    description: 'second statement',
    debit: 'data data',
    credit: 'data data',
    balance: 'data data', 
  },
  {
    date: 'data data',
    tenant: 'tenant 3',
    description: 'third statement',
    debit: 'data data',
    credit: 'data data',
    balance: 'data data', 
  },
  {
    date: 'data data',
    tenant: 'tenant 4',
    description: 'forth statement',
    debit: 'data data',
    credit: 'data data',
    balance: 'data data', 
  },
  {
    date: 'data data',
    tenant: 'tenant 5',
    description: 'fifth statement',
    debit: 'data data',
    credit: 'data data',
    balance: 'data data', 
  },
  {
    date: 'data data',
    tenant: 'tenant 6',
    description: 'sixth statement',
    debit: 'data data',
    credit: 'data data',
    balance: 'data data', 
  }
]

@Component({
  selector: 'app-statements',
  templateUrl: './statements.component.html',
  styleUrls: ['./statements.component.css'],
  providers: [DecimalPipe]
})
  
export class StatementsComponent implements OnInit {
  page = 1;
  pageSize = 4;
  collectionSize = statements.length;
  statements: Statement[] = statements;
  data: any
  action: boolean = false; 
  units!: Unit[]
  tenants!: any
  filter = new FormControl('')
  innerWidth: any
  sideIsClosed!:boolean
  expand = expand
  contract: any
 

  constructor(private http: HttpClient, pipe: DecimalPipe, private interactionService: InteractionService) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth
    this.getUnits()
    this.getTenants()
    this.interactionService.sidebarIsopen$.subscribe(
      message => {
        this.sideIsClosed = !message
      }
    ) 
  }

  @ViewChild('statementstb', { static: false }) el!: ElementRef
  filename:string= 'smart-estate-statement-details'
  columns: string[]=  ['Date', 'Tenant', 'Description', 'Debit/Invoices', 'Credit/Payments', 'Balance']
  
  closeSidebar() {
    if (this.innerWidth < 720) {
      this.interactionService.toggleSidebar(false)
      this.interactionService.toggleDrawer(false)
    }
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

  toggleActions() {
    this.action= !this.action
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
    console.log('I am printing the table')
  }
  
  refreshStatements() {
    this.statements = statements
      .map((statement, i) => ({id: i + 1, ...statement}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
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
      // console.log(this.data)
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
