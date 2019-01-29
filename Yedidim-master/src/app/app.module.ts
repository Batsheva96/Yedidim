import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FirstPageComponent } from './first-page/first-page.component';

import { AppRoutingModule } from './/app-routing.module';
import { RequestHelpComponent } from './request-help/request-help.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthService } from "./auth.service";
import { GuardGuard } from "./guard.guard";

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import {AngularFirestoreModule } from "angularfire2/firestore";
import {FirebaseService} from './service/firebase/firebase.service' ; 
import{MessageService}from './message.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VolunteerPageComponent } from './volunteer-page/volunteer-page.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MainComponent } from './main/main.component';
import { OkComponent } from './ok/ok.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import {ReturnMessageService}  from './return-message.service'


export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDgF3i3um5QkpvlEB6ZBOYP35OB419fTow",
    authDomain: "yedidim-project.firebaseapp.com",
    databaseURL: "https://yedidim-project.firebaseio.com",
    projectId: "yedidim-project",
    storageBucket: "yedidim-project.appspot.com",
    messagingSenderId: "332505901"
  }
};

@NgModule({
  declarations: [
    AppComponent,
    FirstPageComponent,
    RequestHelpComponent,
    ProfileComponent,
    VolunteerPageComponent,
    EditProfileComponent,
    MainComponent,
    OkComponent,
    ConfirmationPageComponent,
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFirestoreModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
     MatCheckboxModule,
     FormsModule, 
     ReactiveFormsModule,
     

   
  ],
  providers: [
    GuardGuard,
    AuthService,
    FirebaseService,
    MessageService,
    ReturnMessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
