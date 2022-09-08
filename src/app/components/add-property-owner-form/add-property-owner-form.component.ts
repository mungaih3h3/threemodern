import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-property-owner-form',
  templateUrl: './add-property-owner-form.component.html',
  styleUrls: ['./add-property-owner-form.component.css']
})
export class AddPropertyOwnerFormComponent implements OnInit {
  constructor(private http:HttpClient) { }
  ngOnInit(): void {
  }

  opened: boolean = true
  
  addPropertyOwnerForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    owner_type: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  })


  savePropertyOwner() {
    let data = this.addPropertyOwnerForm.value;
    this.http.post("http://www.mocky.io/v2/5ea172973100002d001eeada",data)
    .subscribe(Result => {
        console.log(Result)
    })
   console.log(data)
  }


  closeForm(){
    this.opened=false
  }

  openForm(){
    this.opened=true
  }

  resetForm() {
    this.addPropertyOwnerForm.reset()  
  }


}
