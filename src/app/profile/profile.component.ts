import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SharedService } from "../services/shared.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})



export class ProfileComponent implements OnInit {
  @Input() userResp: String;
  userId: any;
  userObj: any;
  Username: any;
  UsernameVaild: string;
  firstName: any;
  firstNameVaild: string;
  lastName: any;
  lastNameVaild: string;
  City: any;
  CityVaild: string;
  State: any;
  StateVaild: string;
  Zip: any;
  ZipVaild: string;
  seletedFile: File;
  url: any;
  base64textString: string;
  photo: File;
  fullName: string;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private http: HttpClient
  ) {
    route.params.subscribe(result => {
      console.log("userId ::" + result.userId);
      this.userId = result.userId;
    });   
    console.log("sharedService :", this.sharedService.getUser());

    //this.userObj = this.sharedService.getUser();

    this.http
      .post("http://localhost:8000/user", {
        userId: this.userId
      })
      .subscribe(
        resp => {
          console.log(resp);
          var user = JSON.parse(JSON.stringify(resp)).user;
          this.userObj = user;

          if (this.userObj.fullName) {
            this.Username = this.userObj.fullName;
            this.UsernameVaild = "is-valid";
          } else {
            this.UsernameVaild = "is-invalid";
          }

          if (this.userObj.firstName) {
            this.firstName = this.userObj.firstName;
            this.firstNameVaild = "is-valid";
          }

          if (this.userObj.lastName) {
            this.lastName = this.userObj.lastName;
            this.lastNameVaild = "is-valid";
          }

          if (this.userObj.State) {
            this.State = this.userObj.State;
            this.StateVaild = "is-valid";
          }

          if (this.userObj.City) {
            this.City = this.userObj.City;
            this.CityVaild = "is-valid";
          }

          if (this.userObj.Zip) {
            this.Zip = this.userObj.Zip;
            this.ZipVaild = "is-valid";
          }

          if (this.userObj.photo) {
            this.base64textString = this.userObj.photo;
            this.ZipVaild = "is-valid";
          }


        },
        err => {
          console.log(err);
        }
      );
  }

  ngOnInit() {}

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.seletedFile = event.target.files[0];
      console.log('this.seletedFile :', this.seletedFile);
      console.log('event :', event);

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event : any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        var binaryString = event.target.result;
        this.base64textString= btoa(binaryString);
        console.log('base64textString ::',btoa(binaryString));
      };

      reader.readAsBinaryString(this.seletedFile);

    }
  }

  public delete(){
    this.url = null;
  }

  firstNameChanged() {
    if (this.firstName) {
      this.firstNameVaild = "is-valid";
    } else {
      this.firstNameVaild = "is-invalid";
    }
  }

  lastNameChanged() {
    if (this.lastName) {
      this.lastNameVaild = "is-valid";
    } else {
      this.lastNameVaild = "is-invalid";
    }
  }

  CityChanged() {
    if (this.City) {
      this.CityVaild = "is-valid";
    } else {
      this.CityVaild = "is-invalid";
    }
  }

  StateChanged() {
    if (this.State) {
      this.StateVaild = "is-valid";
    } else {
      this.StateVaild = "is-invalid";
    }
  }

  ZipChanged() {
    if (this.Zip) {
      this.ZipVaild = "is-valid";
    } else {
      this.ZipVaild = "is-invalid";
    }
  }

  onSubmit() {
    this.fullName = this.firstName+" "+this.lastName;
    console.log("this.fullName :", this.fullName);
    this.http
        .post("http://localhost:8000/userProfile", {
                firstName: this.firstName,
                lastName: this.lastName,
                fullName: this.fullName,
                City: this.City,
                State: this.State,
                Zip: this.Zip,
                photo: this.base64textString,
                userId : this.userId
              })
        .subscribe(result =>{
          console.log('result posted :', result);
          if(result){
            console.log('***********SUCCESS***********');
          }
        })

  }
}
