import { HttpClient, HttpParams } from "@angular/common/http"
import { Param } from '../shared/shared'



export class API{
    static http: any;

    constructor(private http:HttpClient) {  
    }

    static getFromApi(url: any,param: Param): any{
        let queryParams = new HttpParams();
        queryParams = queryParams.append(param.name, param.value);
        return this.http.get(url, { params: queryParams })   
    }

    static postToApi() {
        
    }



    




}
