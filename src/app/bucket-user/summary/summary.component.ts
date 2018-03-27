import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrdersService} from '../../services/orders.service';
import {ShippingAddress} from '../../model/shipping-address';
import {BucketService} from '../bucket.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  private pay: boolean = false;
  private defaultCountry: String = 'USA';
  suppliers = [{'name': 'InPost', 'price': 10}, {'name': 'DHL', 'price': '23'}];
  private id: number;

  constructor(private router: Router,
              private orderService: OrdersService,
              private bucketService: BucketService) {
  }

  selected: string;
  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Dakota',
    'North Carolina',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ];

  ngOnInit() {
  }

  onSubmit(data) {
    const conf = confirm('Are you really sure that you want buy all this products ???');
    const shippingAddress: ShippingAddress = new ShippingAddress(
      localStorage.getItem('login'),
      this.selected,
      data.value.city,
      data.value.postcode,
      data.value.street,
      data.value.name,
      data.value.surname,
      data.value.supplier
    );

    if (conf) {
      this.orderService.buyAllProductFromBucket(shippingAddress).subscribe(
        (response: number) => {
          this.id = response;
          this.bucketService.buyAllProduct.emit(true);
          this.router.navigate(['/success/' + this.id]);
        },
        (error) => console.log(error)
      );
    } else {
      console.log('not I am not sure!!!');
    }
  }


}
