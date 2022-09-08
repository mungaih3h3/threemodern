import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';





declare let Swal: any

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage = '';

  constructor() {
   
  }

  @ViewChild('staticAlert', { static: false })
  staticAlert!: NgbAlert;
  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;

  ngOnInit(): void {
    setTimeout(() => this.staticAlert.close(), 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(2000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  acceptAllRequests() {

    Swal.fire({ title: "Confirmation", 
               text: "Are you sure you want to accept all requests", 
               showCancelButton: true,
               confirmButtonText: "Yes, accept all", 
               closeOnConfirm: true }).then((result: { isConfirmed: any; isDenied: any; }) => {
      
                if (result.isConfirmed) {
                  Swal.fire('Requests Accepted', '', 'success')
                } 
              });
              

    /*
    Swal.fire({
      title: 'All request  will be accepted',
      showCancelButton: true,
      denyButtonText: `Cancel`,
    }).then((result: { isConfirmed: any; isDenied: any; }) => {
      
      if (result.isConfirmed) {
        Swal.fire('Requests Accepted', '', 'success')
      } 
    })*/





  }

}
  
function doRemoveCard(arg0: { title: string; text: string; showCancelButton: boolean; confirmButtonText: string; closeOnConfirm: boolean; }, doRemoveCard: any) {
  throw new Error('Function not implemented.');
}

