import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangepasswordComponent } from './account/changepassword/changepassword.component';
import { ForgotpasswordComponent } from './account/forgotpassword/forgotpassword.component';
import { LoginComponent } from './account/login/login.component';
import { SwitchagentComponent } from './account/switchagent/switchagent.component';
import { AuthGuardService } from './services/authguard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'changepassword', component: ChangepasswordComponent, canActivate: [AuthGuardService] },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'switchagent', component: SwitchagentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
