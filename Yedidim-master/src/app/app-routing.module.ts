import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { ProfileComponent } from './profile/profile.component'
import { RequestHelpComponent } from './request-help/request-help.component';
import { VolunteerPageComponent } from './volunteer-page/volunteer-page.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MainComponent } from './main/main.component';
import { OkComponent } from './ok/ok.component';
import { GuardGuard } from './guard.guard'

import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';

const routes: Routes = [
  { path: "", redirectTo: "main", pathMatch: "full" },
  { path: 'main', component: MainComponent },
  { path: 'first-page', component: FirstPageComponent, canActivate: [GuardGuard] },
  { path: 'volunteer-page', component: VolunteerPageComponent },
  { path: 'ok', component: OkComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'request', component: RequestHelpComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'confirmation-page', component: ConfirmationPageComponent }


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
