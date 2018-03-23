import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-order-successfully',
  templateUrl: './order-successfully.component.html',
  styleUrls: ['./order-successfully.component.css']
})
export class OrderSuccessfullyComponent implements OnInit {
  private isPaid: boolean = false;
  private redirectToBank: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  onPay() {
    this.redirectToBank= true;
    setTimeout(()=>{
      this.redirectToBank=false;
      this.isPaid = true;

    },3000)


  }

}
