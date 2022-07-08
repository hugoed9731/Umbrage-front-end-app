import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';
import { switchMap, tap } from 'rxjs/operators'; 
import { Person } from '../models/User';
import { User, Comment } from '../models/Person';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user!: Person;
  public comments: Comment[] = [];

  constructor(private peopleService: UsersService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.activatedRoute.params
    .pipe(
      switchMap(({ id }) => this.peopleService.getUserId(id)),
      tap(console.log)
    ).subscribe( data => { this.user = data;
        this.comments = data.comments;
       console.log('no se programar', data);
    } );
}


  }

