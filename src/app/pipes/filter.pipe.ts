import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(tenants: any, term: any): any {
    //check if search term is undefined
    if (term === undefined) return tenants;

    //return updated data array
    return tenants.filter(function (tenant: { names: string; }) {
       return tenant.names.toLowerCase().includes(term.toLowerCase())
    })

  

    






  }

}
