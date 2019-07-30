import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ThrowStmt } from "@angular/compiler";
import { SharedService } from "../services/shared.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public userName;
  public fullName;
  public email;
  public id;

  userObj: any;
  userId: any;
  phoneNumber: any;

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
  }

  ngOnInit() {
    this.http.post("http://localhost:8000/user", {
      "userId" : this.userId
    }).subscribe(
      resp => {
        console.log(resp);
        var user = JSON.parse(JSON.stringify(resp)).user;
        this.fullName = user.fullName;
        this.email = user.fullName;
        this.phoneNumber = user.phoneNumber;
      },
      err => {
        console.log(err);
      }
    );
  }
}
