import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { from } from "rxjs";
import { SharedService } from "../services/shared.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  errorFlag = false;
  spinner = false;

  parentMessage = "message from parent";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.spinner = true;
    console.log(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value
    );

    this.http
      .post("http://localhost:8000/user/login", {
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value
      })
      .subscribe(
        resp => {
          this.spinner = false;
          console.log(resp);
          // Navigate to the login page with extras
          var user = JSON.parse(JSON.stringify(resp)).user;
          this.sharedService.setUser(user);
          console.log("resp : " + user);
          //this.router.navigate(['/home',user.fullName]);
          this.router.navigate(["/home", user._id]);
        },
        err => {
          //console.log(err);
          this.errorFlag = true;
          this.spinner = false;
        }
      );
  }
}
