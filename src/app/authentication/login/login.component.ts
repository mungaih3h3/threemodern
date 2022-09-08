import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showSplash = false
  
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  loginForm= new FormGroup({   
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
 
  })
  
  email=this.loginForm.get('email')
  password=this.loginForm.get('password')
     
  loginUser() {
    this.showSplash = true
    setTimeout(() => {
      this.router.navigate(['/admin/dashboard']); 
    }, 3200)
    console.log(this.loginForm.value)
  }



}
