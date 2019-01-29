import { Component, OnInit } from '@angular/core';
import { Volunteer} from '../models/volunteer.model';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {FirebaseService} from '../service/firebase/firebase.service' ;
import { Router } from "@angular/router";



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

public firstname:string;
public lastname:string;
 public phone:number;
 public city:string;
 public category:string;
 public flag:number;
 types: any[];
 public categories:string[]=new Array();
  lat: number;
  lng: number;
  public count1:number=0;
  public count2:number=0;
  public count3:number=0;
  public count4:number=0;
  public count5:number=0;
  public count6:number=0;
  public count7:number=0;
  public count8:number=0;


  constructor( public router:Router , private afs: AngularFirestore, public firebaseService: FirebaseService, ) {

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
    {value: "אלעד" , valueToShow: "אלעד" }
  
  
  
  ];

    this.firstname="";
    this.lastname="";
    this.category="";
    this.phone=null;
    

   }

   sendCtegory(category):void
   {
    this.flag=0;
     this.category=category;
    this.categories.forEach(element => {
      if(element==this.category)
      { this.flag=1;
        var index = this.categories.indexOf(element);
        if (index > -1) 
        {
          this.categories.splice(index, 1);
         }
      }
      
       
     });
     if(this.flag==0)
     {
      this.categories.push(category);
     }
    
    
    console.log(this.categories);

   }
   
   btnSubmit()
   {
   
    if(this.firstname==""||this.lastname==""||this.phone==null||this.phone==null||this.city==null||this.category=="")
     {
      document.getElementById("firstname").style.display="none";
      document.getElementById("lastname").style.display="none";
      document.getElementById("phone").style.display="none";
      document.getElementById("city").style.display="none";
      document.getElementById("category").style.display="none";
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

     }
     
   else
   {

     this.firebaseService.btn1Submit(this.firstname,this.lastname,this.phone,this.city,this.categories);
   }
   
    
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

  
  ngOnInit() {
  }

}
