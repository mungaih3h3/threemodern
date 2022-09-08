import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Param, Tenant } from 'src/app/shared/shared';




const tenants: Tenant[]= []

@Component({
  selector: 'app-property-tenants',
  templateUrl: './property-tenants.component.html',
  styleUrls: ['./property-tenants.component.css']
})

export class PropertyTenantsComponent implements OnInit {
  page = 1
  pageSize = 4
  collectionSize = tenants.length
  data: any
  tenants!: Tenant[]
  params!: Param;
  selected!: string;

  constructor(private http:HttpClient) { }
  ngOnInit(): void {
      this.getTenants()
  }

  format(arg:any) {
    let pattern = '/(\d{2})\.(\d{2})\.(\d{4})/';
    let dt = new Date(arg.replace(pattern,'$3-$2-$1'));

  }
 
  getTenants():any{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("propertyUnitID", 1);
    this.http.get("http://178.79.146.213:8080/smart-real-estate-backend/tenancy/retrieve-tenancies-by-propertyunit",{params:queryParams} )
      .subscribe(Response => {//hold on brother 
        this.data = Response;
        this.data = this.data.data
       // console.log(data)
      }
    )
  }


  















}
