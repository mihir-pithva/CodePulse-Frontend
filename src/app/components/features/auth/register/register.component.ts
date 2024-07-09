import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RegisterUser } from '../login/models/RegisterUser.model';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  user: RegisterUser
  constructor(private _authService:AuthService,private _router:Router){
    this.user = {
      email : "",
      password: ""
    }
  }

  onFormSubmit(){
    this._authService.register(this.user).subscribe({
      next: (response) => {
        console.log(response);
        this._router.navigateByUrl('/login')
      },
      error: (error) => {
        console.log(error);
        
      }
    })
  }

}
