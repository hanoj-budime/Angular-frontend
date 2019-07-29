import { Component, OnInit, Input } from '@angular/core';
import { from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
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
