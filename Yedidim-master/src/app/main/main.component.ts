import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor( public router:Router ) { }
  exsist_volun(): void{
    
        
        this.router.navigate(["first-page"]);
     
  }
  ngOnInit() {
  }

}
