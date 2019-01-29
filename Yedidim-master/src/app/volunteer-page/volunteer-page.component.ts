import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MessageService } from '../message.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Url } from 'url';
import { forEach } from '@angular/router/src/utils/collection';
import {FirebaseService} from '../service/firebase/firebase.service' ;
@Component({
  selector: 'app-volunteer-page',
  templateUrl: './volunteer-page.component.html',
  styleUrls: ['./volunteer-page.component.css']
})
export class VolunteerPageComponent implements OnInit {
  private col:AngularFirestoreCollection<any>;
  public auth;
  public picture:any;
  private itemdoc:AngularFirestoreDocument<any>;
  public phone:number;
  public confirmed:string;
  public _id:string;
  public _email:string;
  public uphone:number;
  public firstname:string;
  public lastname:string;
 

  constructor(public router: Router, public messageService: MessageService,private afsDocument: AngularFirestore,public afAuth: AngularFireAuth, public firebaseService: FirebaseService) { 
  
    this.getPicture();
    this.getVolunteerName();
   

    
   
  }
  

  edit_profile()
  {
    this.router.navigate(["edit-profile"]);
  }
getPicture()
{
  if (this.afAuth.auth.currentUser)
  this.picture = this.afAuth.auth.currentUser.photoURL;
else
  this.picture = "";

}


confirm(_name:string, _lastname:string, _phone:number,_category:string,_city:string,_address:string,_details:string,_puid:string)
{
  
  
  this.confirmed="yes";
  this.messageService.addReturnMessages({
    
      volunteer_first_name :this.firstname,
      volunteer_last_name:this.lastname,
      phone:this.uphone,
      confirmed:this.confirmed,
      id:_puid,
      
     })
     this.messageService.current_mess(_name,_lastname,_phone,_category,_city,_address,_details);

     this.router.navigate(["ok"]);
    }
/*play()
{
var audio = new Audio('assets/2.mp3');
audio.play();
}*/
logOut()
{
  this.firebaseService.logout();
  this.router.navigate(["first-page"]);
}


public getVolunteerName( )
{

  if (this.afAuth.auth.currentUser)
  {
  this.itemdoc=this.afsDocument.doc("volunteers/" +this.firebaseService.getEmail()); 
  this.itemdoc.valueChanges().subscribe(res=>{
    
    this.firstname=res.firstname;
    this.lastname=res.lastname;
    this.uphone=res.phone;
  
  });
  
}

}

  ngOnInit() {
  }

}
