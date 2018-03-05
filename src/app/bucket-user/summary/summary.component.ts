import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  private pay: boolean = false;
  private defaultCountry: String = 'USA';
  suppliers = [{"name": "InPost", "price": 10}, {"name": "DHL", "price": "23"}];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit(data){
    this.router.navigate(['/success'])
  }

  onPay(){
    this.pay =true;
  }

}
