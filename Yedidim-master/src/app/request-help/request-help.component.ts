import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../service/firebase/firebase.service' ;
import { Router } from "@angular/router";
import { Volunteer} from '../models/volunteer.model';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { MessageService } from '../message.service';
import { Data } from '@angular/router/src/config';
import { ReturnMessageService} from '../return-message.service';

@Component({
  selector: 'app-request-help',
  templateUrl: './request-help.component.html',
  styleUrls: ['./request-help.component.css']
})
export class RequestHelpComponent implements OnInit {
  
  

  public firstname:string;
  public lastname:string;
   public phone:number;
   public address:string;
   public detailsEvent:string;
   public category:string;
 public message:string;
 public city :string;
 public date:Date=new Date();
 types: any[];
 public id:string;
public count1:number=0;
public count2:number=0;
public count3:number=0;
public count4:number=0;
public count5:number=0;
public count6:number=0;
public count7:number=0;
public count8:number=0;


 


 
  constructor( public router:Router , private afs: AngularFirestore, public firebaseService: FirebaseService,private messageService: MessageService, public retMessageService:ReturnMessageService) {
   this.firstname="";
  this.lastname="";
   this.phone=null;
  this.address="";
   this.detailsEvent="";
   this.category="";
  this.message="";
   this.id=this.messageService.get_id_message(),

   this.types = [  {value: 0 , valueToShow: "" },
   {value: "אופקים" , valueToShow: "אופקים" },
 {value: "אור יהודה " , valueToShow: " אור יהודה" },
 {value: "אילת" , valueToShow: "אילת" },
 {value: "אפרת" , valueToShow: "אפרת" },
 {value: " אריאל" , valueToShow: "אריאל " },
 {value: "אשדוד" , valueToShow: "אשדוד" },
 {value: "אשקלון" , valueToShow: "אשקלון" },
 {value: " באר שבע" , valueToShow: "באר שבע " },
 {value: "בית שאן" , valueToShow: "בית שאן" },
 {value: "בית שמש" , valueToShow: "בית שמש" },
 {value: " בני ברק" , valueToShow: "בני ברק " },
 {value: "בת ים" , valueToShow: "בת ים" },
 {value: " גבעת שמואל" , valueToShow: " גבעת שמואל" },
 {value: "גדרה" , valueToShow: "גדרה" },
 {value: "הוד השרון" , valueToShow: "הוד השרון" },
 {value: " הרצליה" , valueToShow: "הרצליה " },
 {value: "חדרה" , valueToShow: "חדרה" },
 {value: "חולון" , valueToShow: "חולון" },
 {value: "חיפה " , valueToShow: "חיפה " },
 {value: "טבריה" , valueToShow: "טבריה" },
 {value: "יבנה" , valueToShow: "יבנה" },
 {value: "ירושלים" , valueToShow: "ירושלים" },
 {value: "אלעד" , valueToShow: "אלעד" }];


  
  


   }

   sendCtegory(category):void
   {
     this.category=category;
    

   }

   a(){
     this.count1++;
     if(this.count1%2==0)
     document.getElementById("a").style.backgroundColor="#f2f2f2";
    
     else
     document.getElementById("a").style.backgroundColor="rgb(131, 88, 172)";
     
   }
   b(){
    this.count2++;
    if(this.count2%2==0)
    document.getElementById("b").style.backgroundColor="#f2f2f2";
    else
    document.getElementById("b").style.backgroundColor="rgb(131, 88, 172)";
  }
  c(){
    this.count3++;
    if(this.count3%2==0)
    document.getElementById("c").style.backgroundColor="#f2f2f2";
    else
    document.getElementById("c").style.backgroundColor="rgb(131, 88, 172)";
  }
  d(){
    this.count4++;
    if(this.count4%2==0)
    document.getElementById("d").style.backgroundColor="#f2f2f2";
    else
    document.getElementById("d").style.backgroundColor="rgb(131, 88, 172)";
  }
  e(){
    this.count5++;
    if(this.count5%2==0)
    document.getElementById("e").style.backgroundColor="#f2f2f2";
    else
    document.getElementById("e").style.backgroundColor="rgb(131, 88, 172)";
  }
 f(){
  this.count6++;
  if(this.count6%2==0)
  document.getElementById("f").style.backgroundColor="#f2f2f2";
  else
    document.getElementById("f").style.backgroundColor="rgb(131, 88, 172)";
  }
  g(){
    this.count7++;
    if(this.count7%2==0)
    document.getElementById("g").style.backgroundColor="#f2f2f2";
    else
    document.getElementById("g").style.backgroundColor="rgb(131, 88, 172)";
  }
  h(){
    this.count8++;
    if(this.count8%2==0)
    document.getElementById("h").style.backgroundColor="#f2f2f2";
    else
    document.getElementById("h").style.backgroundColor="rgb(131, 88, 172)";
  }

   format(curr){
    var dd = curr.getDate();
  var mm = curr.getMonth()+1; //January is 0!
  var yyyy =curr.getFullYear();
  var time=curr.getHours();
  if(dd<10){
      dd='0'+dd;
  } 
  if(mm<10){
      mm='0'+mm;
  } 
  var today = dd+'/'+mm+'/'+yyyy+"  "+curr.getHours()+":"+curr.getMinutes()+":"+curr.getSeconds();
  return today;
  }

  req_submit()
{
  if(this.firstname==""||this.lastname==""||this.phone==null||this.phone==null||this.address==""||this.city==null||this.category==""||this.detailsEvent=="")
  {
   document.getElementById("firstname").style.display="none";
   document.getElementById("lastname").style.display="none";
   document.getElementById("phone").style.display="none";
   document.getElementById("city").style.display="none";
   document.getElementById("category").style.display="none";
   document.getElementById("address").style.display="none";
   document.getElementById("details").style.display="none";
   if(this.firstname=="")
   {
    document.getElementById("firstname").style.display="block";
   }
   if(this.lastname=="")
   {
    document.getElementById("lastname").style.display="block";
   }
   if(this.phone==null)
   {
    document.getElementById("phone").style.display="block";
   }
   if(this.phone==null)
   {
    document.getElementById("phone").style.display="block";
   }
   if(this.city==null)
   {
    document.getElementById("city").style.display="block";
   }
   if(this.category=="")
   {
    document.getElementById("category").style.display="block";
   }
   if(this.address=="")
   {
    document.getElementById("address").style.display="block";
   }
   if(this.detailsEvent=="")
   {
    document.getElementById("details").style.display="block";
   }

  }
  
else
{

  this.messageService.add({

    name :this.firstname,
    lastname:this.lastname,
    phone: this.phone,
    category:this.category,
    address:this.address,
    details:this.detailsEvent,
    date: this.format(this.date),
    city:this.city,
    id:this.id,
    
  
  
   });
   this.retMessageService.currentMessage(this.firstname,this.lastname,this.id);

   this.router.navigate(["confirmation-page"]);
}


}



  ngOnInit() {
  }

}