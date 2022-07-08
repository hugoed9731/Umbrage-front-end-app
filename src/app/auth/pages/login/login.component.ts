import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
      username:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.loginForm.value);
    const{username, password} = this.loginForm.value;

    this.authService.login(username, password)
      .subscribe(ok => {
        if(ok) {
          this.router.navigateByUrl('/list');
        } else{
          Swal.fire('Error', ok, 'error' );
        }
       })
  }

}
