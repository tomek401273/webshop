import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrdersService} from '../../services/orders.service';
import {ShippingAddress} from '../../model/shipping-address';
import {BucketService} from '../bucket.service';
import {BucketServerService} from '../bucket-server.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  private pay = false;
  private defaultCountry: String = 'USA';
  suppliers = [{'name': 'InPost', 'price': 10}, {'name': 'DHL', 'price': '23'}];
  private id: number;
  private userAddress: ShippingAddress = new ShippingAddress(null, null, null, null, null, null, null, null);
  private userAddressBackUp: ShippingAddress = new ShippingAddress(null, null, null, null, null, null, null, null);

  useDiffAddress = false;
  @ViewChild('form') addersShipping: NgForm;

  constructor(private router: Router,
              private orderService: OrdersService,
              private bucketService: BucketService,
              private bucketServerService: BucketServerService) {
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
    this.bucketServerService.getAddressShippment().subscribe(
      (response: ShippingAddress) => {
        this.userAddress = response;
        this.userAddressBackUp = response;
      },
      (error) => console.log(error)
    );
  }

  onSubmit(data) {
    const conf = confirm('Are you really sure that you want buy all this products ???');
    const shippingAddress: ShippingAddress = new ShippingAddress(
      localStorage.getItem('login'),
      this.userAddress.country,
      this.userAddress.city,
      this.userAddress.postCode,
      this.userAddress.street,
      this.userAddress.name,
      this.userAddress.surname,
      this.userAddress.supplier
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
    }
  }

  onUseDifferentAddress() {
    if (!this.useDiffAddress) {
      this.userAddress = new ShippingAddress(null, null, null, null, null, null, null, null);
    } else {
      this.userAddress = this.userAddressBackUp;
    }
  }

}
