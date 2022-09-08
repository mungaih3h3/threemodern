import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms'
import { InteractionService } from 'src/app/services/shared-data.service';
import { Option, User } from '../../shared/shared'

declare let Swal: any

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  report: any
  success: boolean = false
  userId: number= 2

  constructor(private http:HttpClient, private interactionService:InteractionService) { }
  ngOnInit(): void {
  }

  userTypes: Option[] = [
    {value: 'PROPERTYMANAGER', viewValue: 'Property Manager'},
    {value: 'TENANT', viewValue: 'Tenant' },
  ]
  
  MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }

  signUpForm = new FormGroup({
    propertyManagerID: new FormControl('',[Validators.required]),
    username: new FormControl('',[Validators.required]),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    userType: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
    confirm_psw: new FormControl('', [Validators.required])
  },
  [this.MatchValidator('password','confirm_psw')]
  )
    
  propertyManagerID = this.signUpForm.get('propertyManagerID')
  username = this.signUpForm.get('username')
  emailAddress = this.signUpForm.get('emailAddress')
  phoneNumber=  this.signUpForm.get('phoneNumber')
  password = this.signUpForm.get('password')
  userType= this.signUpForm.get('userType')
  confirm_psw = this.signUpForm.get('confirm_psw')


  get passwordMatchError() {
    return (
      this.signUpForm.getError('mismatch') &&
      this.signUpForm.get('confirm_psw')?.touched
    );
  } 

  test={
    "propertyManagerID":1,
    "username":"muthike789@gmail.com",
    "password":"Karanjaeric@789",
    "emailAddress":"muthike789@gmail.com",
    "phoneNumber":"0702332833",
    "userType":"PROPERTYMANAGER"
  }


  registerUser() {
   // let data = this.test
    this.propertyManagerID?.setValue(getRandom(2,50))
    let data = this.signUpForm.value
    let user: User = {
      propertyManagerID: this.propertyManagerID?.value,
      username: this.username?.value,
      password: this.password?.value,
      emailAddress: this.emailAddress?.value,
      phoneNumber: this.phoneNumber?.value,
      userType: this.userType?.value
    }
    console.log(user)

   //let data =  this.signUpForm.value
    this.http.post("http://178.79.146.213:8080/smart-real-estate-backend/users/create",user)
    .subscribe(Result => {
      //console.log(Result)
      this.report = Result
      this.success = this.report.success
      this.report = this.report.message
      console.log(Result)

      if (this.success) {
         Swal.fire(
        'Success!',
         this.report,
        'success'
         )
        this.interactionService.setUserData(user)
        
        
      } else if (!this.success) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: this.report,
        })
      } else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a>Why do I have this issue?</a>'
        })
       }
        
     
    })
}
  
}

function getRandom(min: number, max:number) : number{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}
