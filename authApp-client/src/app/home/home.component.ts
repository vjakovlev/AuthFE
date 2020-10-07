import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userDetails: any

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: res => {
        this.userDetails = res
      },
      error: err => console.warn(err),
      complete: () => this.checkIfUserHasAdminRole()
    })

  }

  onLogout() {
    localStorage.removeItem("token");
    this.router.navigate(["/user/login"]);
  }

  test() {
    console.log(this.userDetails.role)
    console.log(this.userDetails.role.includes("ADMIN"))
  }

  checkIfUserHasAdminRole() {
    if(this.userDetails.role.includes("ADMIN")) {
      return true
    } else {
      return false 
    }

    //return this.userDetails.role.includes("Admin") ? true : false
  }

}
