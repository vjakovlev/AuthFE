import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  // formModel = new FormGroup({
  //   UserName: new FormControl('', Validators.required),
  //   Email: new FormControl('', Validators.required),
  //   FullName: new FormControl('', Validators.required),
  //   Password: new FormControl('', Validators.required),
  // })

  constructor(public userService: UserService) { }

  ngOnInit(): void {}

  onSubmit() {
    
    this.userService.register().subscribe({
      next: res => {
        console.log(res)
      },
      error: err => console.log(err)
    })

  }

}
