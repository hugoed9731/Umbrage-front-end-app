import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [

    {
    path: '',
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'users/:id', component: UserComponent},
      { path: '**', redirectTo: 'users'}

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
