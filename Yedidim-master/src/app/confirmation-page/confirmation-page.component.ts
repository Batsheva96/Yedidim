import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MessageService } from '../message.service';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import {FirebaseService} from '../service/firebase/firebase.service' ;
import { ReturnMessageService} from '../return-message.service';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css']
})
export class ConfirmationPageComponent implements OnInit {
  private itemdoc:AngularFirestoreCollection<any>;
  public _id:string;
  private messages: any[];
  public messageBack:any[]=new Array();
  public firstname:string;
  public lastname:string;
  public phone:number;
  public volunteer_name:string;
  public volunteer_lastname:string;
  public volunteer_phone:number;
  private messages_list: AngularFirestoreCollection<any>;
  private messages_details: any[];
  public  puid:string;

  constructor( public router: Router, public messageService: MessageService,private afsDocument: AngularFirestore, public firebaseService: FirebaseService, public returnMessageService: ReturnMessageService )
   { 
     this.itemdoc=this.afsDocument.collection("return_messages");
    this.itemdoc.valueChanges().subscribe(mess=>{
      this.messages=mess;
      if(this.messages!=null)
      {
        this.messages.forEach(element => {
         
          
          console.log(this.returnMessageService.get_currid());
          console.log(this.returnMessageService.get_currname());
          console.log(this.returnMessageService.get_currlastname());
          console.log(element.id);
          console.log(this.check_id_match(element.id));
          
         
          if(element.id==this.returnMessageService.get_currid() && element.id==this.check_id_match(element.id)&&element.confirmed=="yes")
          {
            console.log(element.id);
            console.log(this.returnMessageService.get_currid());
            console.log(this.check_id_match(element.id));
              document.getElementById("waiting").style.display="none";
              this.firstname=this.returnMessageService.get_currname();
              this.lastname=this.returnMessageService.get_currlastname();
              this.volunteer_lastname=element.volunteer_last_name;
              this.volunteer_name=element.volunteer_first_name;
              this.volunteer_phone=element.phone;
             // this.firstname=this.returnMessageService.get_name();
             // this.lastname=this.returnMessageService.get_lastname();
              document.getElementById("return").style.display="block";
              
              
          }


        });

      }

      
    });



    
    
    
     
   }

   public check_id_match(_pid:string)
   {
     this.messages_list=this.afsDocument.collection('messages');
     this.messages_list.valueChanges().subscribe(res=>{
      this.messages_details=res;
    });
    if(this.messages_details!=null)
    {
      this.messages_details.forEach(belement => {
        
        if(belement.id== _pid)
        {
          
         // this.firstname=belement.name;
         // this.lastname=belement.lastname;
          //this.phone=belement.phone;
          this.puid=belement.id
 
        }
 
 
      });
    }
    return this.puid;
   }
 public back()
 {
  this.router.navigate(["first-page"]);
 }

  ngOnInit() {
  }

}
