import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ShowPublicDataSevice} from '../../services/show-public-data.sevice';
import {ConfirmDto} from '../../model/dto/confirm-dto';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-confirm-newsletter',
  templateUrl: './confirm-newsletter.component.html',
  styleUrls: ['./confirm-newsletter.component.css']
})
export class ConfirmNewsletterComponent implements OnInit {
  email: string;
  codeConfirm: string;
  isSuccessfully= false;
  result: string;
  authenticationComplete = false;
  @ViewChild('success') success: SwalComponent;
  @ViewChild('error') error: SwalComponent;

  constructor(private activatedRoute: ActivatedRoute,
              private showPublicService: ShowPublicDataSevice) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        this.email = params['email'];
        this.codeConfirm = params['code-confirm'];
      }
    );

    this.showPublicService.confirmNewsletterEmail(this.email, this.codeConfirm).subscribe(
      (confirmDto: ConfirmDto) => {
        this.authenticationComplete = true;
        if (confirmDto.discount === true) {
          this.success.show();
          this.isSuccessfully = true;
          this.result = 'Process subscription verification was successfully this is your discount code: ' + confirmDto.discountCode;
        } else {
          this.error.show();
          this.isSuccessfully = false;
          this.result = 'Something go wrong contact with our service';
        }
      },
      () => {
        this.error.show();
        this.isSuccessfully = false;
        this.result = 'Something go wrong contact with our service';
      }
    );
  }
}
