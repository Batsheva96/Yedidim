import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Volunteer } from '../models/volunteer.model';
import { Observable } from 'rxjs/Observable';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-ok',
  templateUrl: './ok.component.html',
  styleUrls: ['./ok.component.css']
})
export class OkComponent implements OnInit {
  public _name: string;
  public _lastname: string;
  public _phone: number;
  public _cat: string;
  public _address: string;
  public _details: string;
  public _city: string;


  constructor(public router: Router, public messageService: MessageService) {
    this._name = this.messageService.get_curr_name();
    this._lastname = this.messageService.get_curr_last();
    this._phone = this.messageService.get_curr_phone();
    this._address = this.messageService.get_curr_address();
    this._cat = this.messageService.get_curr_cat();
    this._city = this.messageService.get_curr_city();
    this._details = this.messageService.get_curr_details();


  }
  back(): void {
    this.router.navigate(["volunteer-page"]);
  }

  ngOnInit() {
  }
}
