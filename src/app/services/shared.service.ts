import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  user : any;
  
  constructor() { }

  
  getUser() : Observable<any>  {
    return this.user;
  }

  
  setUser(v : any) {
    this.user = v;
  }
}
