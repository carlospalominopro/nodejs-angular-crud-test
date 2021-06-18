import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NewsComponent } from './news/news.component';


const appRoutes: Routes = [
  { path: '*/*', redirectTo: '' },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent, canActivate : [AuthGuard] },
  { path: 'news', component: NewsComponent, canActivate : [AuthGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent},
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ]
})
export class AppRoutingModule { }
