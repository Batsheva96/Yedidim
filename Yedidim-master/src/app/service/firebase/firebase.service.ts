import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Volunteer } from '../../models/volunteer.model';
import { Router } from "@angular/router";

@Injectable()
export class FirebaseService {
  public auth;
  private _profile;
  private _id: string;
  private _name: string;
  private _email: string;
  private _phone: number;
  public volunteerRef;




  constructor(public afAuth: AngularFireAuth, private afsDocument: AngularFirestore, public router: Router) {
    this.volunteerRef = this.afsDocument.collection("volunteers");
  }



  async login() {
    let u = await this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    console.log(u);
    return this.getUserData(u.user.email);
    //u.user.photoURL

  }

  logout() {
    this.afAuth.auth.signOut();
  }

  private getUserData(id: string) {
    return new Promise((res, rej) => {
      this.afsDocument.doc("volunteers/" + id).valueChanges().subscribe(user => {
        this._profile = user;
        res(this._profile);
      });
    });

  }



  private getid() {
    if (this.afAuth.auth.currentUser)
      this._id = this.afAuth.auth.currentUser.uid;
    else
      this._id = "";
    return this._id;
  }


  public getEmail() {
    if (this.afAuth.auth.currentUser)
      this._email = this.afAuth.auth.currentUser.email;
    else
      this._email = "";
    return this._email;
  }
  public getFirstName() {

    if (this.afAuth.auth.currentUser)
      this._name = this.afAuth.auth.currentUser.displayName;
    else
      this._name = "";
    return this._name;

  }
  public getPhone() {
    if (this.afAuth.auth.currentUser)
      this._name = this.afAuth.auth.currentUser.phoneNumber;
    else
      this._phone = null;
    return this._phone;


  }

  public getUserCategory(){
    return this._profile ? this._profile.helpCategory : []
  }


  updateProfile(obj) {
    this._profile = obj;
    this.update();
  }

  private update() {
    if (this.getid().length > 0)
      this.afsDocument.doc("users/" + this._id).set(this._profile).then(res => {

      });
  }


  public btn1Submit(firstname, lastname, phone, city, category) {
    console.log(category);
    this.volunteerRef.doc(this.getEmail()).set({
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      city: city,
      helpCategory: category


    });

    this.router.navigate(["volunteer-page"]);

  }


}


