
import { DecimalPipe } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, Input, ViewChild, ElementRef, PipeTransform, HostListener } from '@angular/core';
import jsPDF from 'jspdf';
import { contract, expand, Param, Tenant } from 'src/app/shared/shared';
import * as XLSX from 'xlsx';
import { InteractionService } from 'src/app/services/shared-data.service';

export let tenants: any[] = []

function search(text: string, pipe: PipeTransform): any[] {
  return tenants.filter(tenant => {
    const term = text.toLowerCase();
    return tenant.tenant.firstName.toLowerCase().includes(term)
      || tenant.tenant.phoneNumber.toLowerCase().includes(term)
      || tenant.tenant.emailAddress.toLowerCase().includes(term)
      || tenant.fromDate.toLowerCase().includes(term)
      || tenant.tenant.tenantStatus.toLowerCase().includes(term)
  });
}  

@Component({
  selector: 'app-tenancy',
  templateUrl: './tenancy.component.html',
  styleUrls: ['./tenancy.component.css'],
  providers: [DecimalPipe]
})
  
  
export class TenancyComponent implements OnInit {
  page = 1;
  pageSize = 4;
  collectionSize = tenants.length;
  tenants$!: Observable<any[]>
  data: any
  params!: Param;
  selected!: string;
  index: any
  action: boolean = false
  tenants!: any[]
  filter = new FormControl('')
  innerWidth: any
  sideIsClosed!:boolean
  expand = expand
  contract: any


constructor(private http:HttpClient, pipe: DecimalPipe, private interactionService: InteractionService) {
    this.refreshTenants()
    this.tenants$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(text, pipe))
    );
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth
    this.getTenants()
    this.interactionService.sidebarIsopen$.subscribe(
      message => {
        this.sideIsClosed = !message
      }
    ) 
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.innerWidth = window.innerWidth;
    this.contract =  this.innerWidth > 720 ? contract : expand
  }

  closeSidebar() {
    if (this.innerWidth < 720) {
      this.interactionService.toggleSidebar(false)
      this.interactionService.toggleDrawer(false)

    }
     
  }

  toggleActions() {
    this.action= !this.action
  }

  columns: string[]= ['Name', 'Phone', 'Email', 'Tenant Since', 'Property Unit', 'Status']
  filename:string= 'smart-estate-tenancy-details'
  @Input() searchTerm:String=''
  @ViewChild('tenancytb', { static: false }) el!: ElementRef 
  openSection(value: string, val:any) {
    this.selected = value
    this.index =val 
  }

  restore($event: string) {
    this.selected = $event;
  }

  operateOnTable($event: any) {
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
    let pdf = new jsPDF('p', 'pt', [1000, 1000])
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

  refreshTenants() {
    this.tenants = tenants
      .map((tenants, i) => ({id: i + 1, ...tenants}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  getTenants():any{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("propertyManagerID", 1);
    this.http.get(" http://178.79.146.213:8080/smart-real-estate-backend/tenancy/retrieve-tenancies-by-propertymanager",{params:queryParams} )
      .subscribe(Response => {
        this.data = Response;
        tenants = this.data.data
        this.tenants=tenants
        console.log(this.data)
      }
    )
  }    






}

