import { Component, OnInit } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { PropertyManager } from 'src/app/shared/shared';




export const propertyManager: PropertyManager[] = []


interface PropertyManagers{
  owner_id: string;
  property_name: string;
  description: string;
  payment_details: string;
  contact: string;
  status: string;
}


interface Mocky{
  name: string;
  position: string; 
  office: string;
  salary: string;
}

@Component({
  selector: 'app-property-managers',
  templateUrl: './property-managers.component.html',
  styleUrls: ['./property-managers.component.css']
})
export class PropertyManagersComponent implements OnInit {

  data: any;
  mockies!: Mocky[];
  propertManagers!: PropertyManager[];
  
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get("http://www.mocky.io/v2/5ea172973100002d001eeada")
    .subscribe(Response => {
        alert(Response)
        console.log(Response)
        this.data = Response;
        this.mockies = this.data.list
        console.log(this.mockies)
      }
    )

    getPropertyManagers(this.data, this.propertManagers)
  }
}

let http:HttpClient
export function getPropertyManagers(data: any, propertyManagers:PropertyManager[]): any{
  let queryParams = new HttpParams();
  queryParams = queryParams.append("propertyManagerID", 1);
  http.get('')
  .subscribe(Response => {
     // console.log(Response)
      data = Response;
      propertyManagers =data.data
     // console.log(this.property)
    }
  )
}