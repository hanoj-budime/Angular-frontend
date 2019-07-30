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
    this.userObj = this.sharedService.getUser();
    
    if (this.userObj.fullName) {
      this.Username = this.userObj.fullName;
      this.UsernameVaild = "is-valid";
    } else {
      this.UsernameVaild = "is-invalid";
    }
    
    if (this.userObj.firstName) {
      this.firstName = this.userObj.firstName;
      this.firstNameVaild = "is-valid";
    } else {
      this.firstNameVaild = "is-invalid";
    }

    if (this.userObj.lastName) {
      this.lastName = this.userObj.lastName;
      this.lastNameVaild = "is-valid";
    } else {
      this.lastNameVaild = "is-invalid";
    }
    
  }

  ngOnInit() {}
}
