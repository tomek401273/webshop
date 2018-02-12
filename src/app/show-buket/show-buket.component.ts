import { Component, OnInit } from '@angular/core';
import {ServerService} from '../services/server.service';
import {BucketData} from './BucketData';
import {ProductData} from '../product-row/ProductData';

@Component({
  selector: 'app-show-buket',
  templateUrl: './show-buket.component.html',
  styleUrls: ['./show-buket.component.css']
})
export class ShowBuketComponent implements OnInit {
  bucketsData= [
    {
      user: 'TTT',
  productList: [
    {
      price: 10000,
      title: 'Procesor',
      description: 'super Procesor',
      imageLink: 'http://themillenniumreport.com/wp-content/uploads/2017/03/e5403971-5cd3-4010-9401-c0c264ac23dd1.jpg'
    }
  ]
    }
  ];

  constructor(private serverService: ServerService) { }
  ngOnInit() {
  }

  onGetBuckets() {
    this.serverService.getBuckets()
      .subscribe(
        (buckets: any[]) => this.bucketsData = buckets,
        (error) => console.log(error)
      );
    console.log(this.bucketsData);
  }

}
