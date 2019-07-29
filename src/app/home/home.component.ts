import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public userName;

  constructor(private route: ActivatedRoute ) { 
    route.params
        .subscribe(result =>{
          console.log("userName ::"+result.userName);
          this.userName = result.userName;
          //this.userName.
        })
  }

  ngOnInit() {
    console.log("Hi");
    //console.log(this.login.loginForm);
  }

}
