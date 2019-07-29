import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http'
import { from } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupFrom: FormGroup;
  submitted  =  false;
  error = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private http : HttpClient,
    ) { }

   ngOnInit() {
    this.signupFrom = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', ],
      createPassword: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

    // convenience getter for easy access to form fields
    get f() { return this.signupFrom.controls; }

    onSubmit() {
      this.submitted = true;
      console.log(this.signupFrom.controls.email.value, this.signupFrom.controls.repeatPassword.value , this.signupFrom.controls.createPassword.value);
      
      var match1 = this.signupFrom.controls.createPassword.value;
      var match2 = this.signupFrom.controls.repeatPassword.value;

      if(match1 === match2){
        this.http.post("http://localhost:8000/user/signup",
        {
          "email":this.signupFrom.controls.email.value,
          "fullName":this.signupFrom.controls.fullName.value,
          "phoneNumber":this.signupFrom.controls.phoneNumber.value,
          "password":this.signupFrom.controls.createPassword.value
        })
          .subscribe(resp =>{
            console.log(resp);
            console.log(this.router.navigate['/test'])
            //this.router.navigate['/test']
            // Navigate to the login page with extras
            this.router.navigate(['/test']);
          },err => {
            console.log(err);
          })
      }else{
        this.error = true;
      }
  
      }
     

}
