import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LocationService } from '../common/services/location/location.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    public router: Router,
    private locationService: LocationService
    ) { }
  exsist_volun(): void {


    this.router.navigate(["first-page"]);

  }
  ngOnInit() {
  }
  // async getLocation(){
  //   await this.locationService.publishLocation();
  // }
}
