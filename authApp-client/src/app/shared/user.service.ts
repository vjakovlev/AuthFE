import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  formModel = new FormGroup({
    UserName: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
    FullName: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
  })

  register() : Observable<any> {
    let body = {
      UserName : this.formModel.value.UserName,
      Email : this.formModel.value.Email,
      FullName : this.formModel.value.FullName,
      Password : this.formModel.value.Password,
    }
    return this.http.post("http://localhost:5000/api/applicationuser/register", body);
  }

  login(body) : Observable<Token> {
    return this.http.post<Token>("http://localhost:5000/api/applicationuser/login", body);
  }

  getUserProfile() {
    return this.http.get("http://localhost:5000/api/UserProfile");
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

}

export interface Token {
  token: string
}

