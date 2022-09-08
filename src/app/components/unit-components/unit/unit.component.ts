
import { DecimalPipe } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, PipeTransform, HostListener } from '@angular/core';
import jsPDF from 'jspdf';
import { contract, expand, Param, Property, Unit } from 'src/app/shared/shared';
import * as XLSX from 'xlsx';
import { InteractionService } from 'src/app/services/shared-data.service';

export let units: Unit[] = []

function search(text: string, pipe: PipeTransform): Unit[] {
  return units.filter(unit => {
    const term = text.toLowerCase();
    return unit.unitCode.toLowerCase().includes(term)
      || unit.unitName.toLowerCase().includes(term)
      || unit.unitDescription.toLowerCase().includes(term)
      || unit.waterMeter.toLowerCase().includes(term)
      || unit.electricityMeter.toLowerCase().includes(term)
      || unit.unitStatus.toLowerCase().includes(term)
  });
}

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css'],
  providers: [DecimalPipe]
})
  
  
export class UnitComponent implements OnInit {
  page = 1
  pageSize = 4
  collectionSize = units.length
  data: any
  units$: Observable<Unit[]>
  params!: Param;
  selected!: string;
  index: any
  action: boolean= false;
  filter = new FormControl('', [Validators.nullValidator])
  @ViewChild('unitstb', { static: false }) el!: ElementRef
  filename: string = 'smart-estate-units-details'
  columns: string[] = ['Code', 'Name', 'Description', 'Rent Amt', 'Deposit Amt', 'Elect Meter', 'Water Meter', 'Unit Status']
  units!: Unit[];
  property!: Property[]
  tenants!: any
  innerWidth!: any
  sideIsClosed!:boolean
  expand = expand
  contract: any

  constructor(private http: HttpClient, pipe: DecimalPipe, private interactionService:InteractionService) {
    //this.refreshUnits()
    this.units$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(text, pipe))
    );
  }

  ngOnInit(): void {
    this.innerWidth =window.innerWidth
    this.getUnits()
    this.getTenants()
    this.getProperty()
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

  getUnits():Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("propertyID", 1);
    this.http.get("http://178.79.146.213:8080/smart-real-estate-backend/propertyunits/retrieve-propertyunits-by-property",{params:queryParams} )
    .subscribe(Response => {
        this.data = Response;
        units = this.data.data
        this.units=units
        //console.log(this.units$)
        console.log(units)
        console.log(this.units$)
    }
    )
    console.log(units)
    console.log(this.units$)
     return this.units$
  }


  filterByTenant(val: string) {
    this.filter.setValue(val)
  }
  

  filterByProperty(val: string) {
    this.filter.setValue(val)
  }
 

  getProperty(): any {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("propertyManagerID", 1);
    this.http.get("http://178.79.146.213:8080/smart-real-estate-backend/properties/find-by-propertymanager", { params: queryParams })
      .subscribe(Response => {
        // console.log(Response)
        this.data = Response;
        this.property = this.data.data
       // console.log(this.property)
      
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
        console.log(this.data)
      }
    )
  }    

  restore($event: string) {
    this.selected = $event;
  }

  toggleActions() {
    this.action= !this.action
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

  openSection(value: string) {
    this.selected=value
  }

  printTable() {
    let element= this.el.nativeElement;  
    let newWin = window.open(this.filename);  
    newWin?.document.write(element.outerHTML);  
    newWin?.print();  
    newWin?.close();
  }

  showUnitDetails(val: any) {
    this.selected = 'details'
    this.index = val
    console.log(this.index)
     console.log(val)
  }

  /*
  refreshUnits() {
  this.units$=units
      .map((property, i) => ({id: i + 1, ...property}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }*/

}
