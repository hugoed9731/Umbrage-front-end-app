import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UsersService } from '../services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: User[] = [];
  public name: string = '^[a-zA-ZÀ-ÿ\s]{1,40}$';
  public job: string = '^[a-zA-Z ]*$';
  public email: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


  newUser: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.email)]],
    first_name: ['', [Validators.required, Validators.pattern(this.name), Validators.minLength(2)]],
    last_name:['', [Validators.required, Validators.pattern(this.name), Validators.minLength(2)]],
    job_title:['', [Validators.required, Validators.pattern(this.job), Validators.minLength(2), Validators.maxLength(30)]],
    // avatar:['', [Validators.required]]
  })

  constructor(private peopleService: UsersService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.listUsers();
  }


  listUsers(){
    this.peopleService.chargeUsers()
      .subscribe( data => {
        this.users = data;
        console.log('this is my object', data);
      });
  }

  // ! errors
  get emailErrorMsg(): string {
    const errors = this.newUser.get('email')?.errors;
  
    if(errors?.['required']){
      return 'Email is required';
    } else if (errors?.['pattern']) {
      return 'No email format';
    } 
  
    return '';
  }

  get firstnameErrorMsg(): string {
    const errors = this.newUser.get('first_name')?.errors;
  
    if(errors?.['required']) {
      return 'First name is required.';
    }  else if(errors?.['minlength']) {
      return 'Must be two words.'
    } else if(errors?.['pattern']) {
      return 'No name format.'
    }
   
    return '';
  }
  
  get lastnameErrorMsg(): string {
    const errors = this.newUser.get('last_name')?.errors;
  
    if(errors?.['required']) {
      return 'Lastname is required';
    }  else if(errors?.['minlength']) {
      return 'Must be two words.'
    } else if(errors?.['pattern']) {
      return 'No name format.'
    }
    return '';
  }

  get jobErrorMsg(): string {
    const errors = this.newUser.get('job_title')?.errors;
  
    if(errors?.['required']) {
      return 'Name of job is required';
    }  else if(errors?.['minlength']) {
      return 'Must be two words.'
    }  else if(errors?.['maxlength']) {
      return 'This is not a job name.'
    } else if(errors?.['pattern']) {
      return 'No name format.'
    }
    return '';
  }

  noValid( campo: string ) {
    return this.newUser.get(campo)?.invalid
            && this.newUser.get(campo)?.touched;
  }


  create() {
    console.log('Myform nene', this.newUser.value);


    if(this.newUser.invalid){
      this.newUser.markAllAsTouched();
      return; 
    } 

    this.peopleService.createUser(this.newUser.value)
      .subscribe(resp => {
        console.log('Usuario creado', resp);
        this.listUsers();
        this.newUser.reset();

        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'user created successfully',
          showConfirmButton: false,
          timer: 1700
        })

        this.newUser.reset();
      });
  }
  
  deleteUser(user: User) {
    Swal.fire({
      title: 'Are you sure to delete this user?',
      text: `you are about to delete  ${ user.first_name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if(result.isConfirmed) {
        this.peopleService.deleteUser(user.id)
          .subscribe(resp => {
            this.listUsers(); // update the page the see the changes
            Swal.fire(
              {
                title: '¡User deleted!',
                icon: 'success',
                text: `${user.first_name} was successfully deleted.`
              }
            )
          });
      }
    })
  }

}
