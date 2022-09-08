import { DecimalPipe } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, PipeTransform, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { API } from 'src/app/API/api-services';
import { Param, Property, PropertyManager, expand, contract, holderDark } from 'src/app/shared/shared';
import * as XLSX from 'xlsx';
import { InteractionService } from 'src/app/services/shared-data.service';

export let propertyManager: PropertyManager[]= []
export let property: Property[] = []

function search(text: string, pipe: PipeTransform): Property[] {
  return property.filter(property => {
    const term = text.toLowerCase();
    return property.propertyName.toLowerCase().includes(term)
      || property.propertyCode.toLowerCase().includes(term)
      || property.title.toLowerCase().includes(term)
      || property.propertyDescription.toLowerCase().includes(term)
      || property.propertyPurpose.toLowerCase().includes(term)
      || pipe.transform(property.price).includes(term)
    
  });
} 

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css'],
  providers: [DecimalPipe]
})


export class PropertyComponent implements OnInit {
  page = 1
  pageSize = 4
  collectionSize = property.length
  data: any
  property$: Observable<Property[]>;
  params!: Param;
  index: any
  action: boolean = false;
  default: boolean = true;
  details: boolean = !this.default;
  selected: String = 'Property Type'
  filter = new FormControl('')
  property!: Property[];
  innerWidth!: any 
  sideIsClosed!:boolean
  expand = expand
  contract: any

  constructor(private http: HttpClient, pipe: DecimalPipe, private interactionService: InteractionService) {
      //this.refreshProperty()
      this.property$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => search(text, pipe))
      );
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth
    this.getProperty()
    this.getPropertyManager()
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

  getProperty(): any {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("propertyManagerID", 1);
    this.http.get("http://178.79.146.213:8080/smart-real-estate-backend/properties/find-by-propertymanager", { params: queryParams })
      .subscribe(Response => {
        // console.log(Response)
        this.data = Response;
        property = this.data.data
        this.property=property
        console.log(property)
        console.log(this.property$)
      }
      )
  }
  
  getPropertyManager(): any {
      let queryParams = new HttpParams();
      queryParams = queryParams.append("propertyManagerID", 1);
      this.http.get('')
        .subscribe(Response => {
          // console.log(Response)
          this.data = Response;
          property= this.data.data
          // console.log(this.property)
        }
        )
  }


    toggleActions() {
      this.action = !this.action
    }
      
 
    openSection(value: string, val: any) {
      this.selected = value
      this.index = val
    }


    /*
    getProperty(): any{
      let url = "http://178.79.146.213:8080/smart-real-estate-backend/properties/find-by-propertymanager"
      this.params.name = "propertyManagerID"
      this.params.value='1'
      API.getFromApi(url, this.params).subscribe(
        (      Response: any) => {
          console.log(Response)
          this.data = Response;
          property = this.data.data
          console.log(property)
        }
      )
  
    }*/

    @ViewChild('propertytb', { static: false }) el!: ElementRef
    filename: string = 'smart-estate-property-details'
    columns: string[] = ['Property Code',
      'Property Name',
      'Title',
      'Description',
      'Purpose',
      'Price']
    property_types = ['Apartment', 'Bungalow', 'Massionette', 'Office', 'Shop', 'Land']

    openForm() {
      this.selected = 'Property Type'
    }

    restore($event: String) {
      this.selected = $event;
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
      else if ($event == 'Print')
        this.printTable()
    }

    copyTable() {
      console.log('I am copying  the table')
    }

    generateCsv() {
      console.log('I am generating csv')
    }

    generateExcel() {
      let element = this.el.nativeElement;
      const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
 
      // generate workbook and add the worksheet 
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
 
      // save to file   
      XLSX.writeFile(workbook, this.filename + '.xlsx');
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
      let element = this.el.nativeElement;
      let newWin = window.open(this.filename);
      newWin?.document.write(element.outerHTML);
      newWin?.print();
      newWin?.close();
    }

    showPropertyDetails() {
      this.selected = 'details'
    }

    return($event: String) {
      this.selected = $event;
    }

    refreshProperty() {
      property = property
        .map((property, i) => ({ id: i + 1, ...property }))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
    //KEY=AIzaSyClURqnBdMCCMU64femPFaPvKUFa0SjQeA
  
}


