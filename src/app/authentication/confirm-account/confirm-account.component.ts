import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmDto} from '../../model/dto/confirm-dto';
import {ActivatedRoute, Params} from '@angular/router';
import {ShowPublicDataSevice} from '../../services/show-public-data.sevice';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.css']
})
export class ConfirmAccountComponent implements OnInit {
  email: string;
  codeConfirm: string;
  isSuccessfully= false;
  result: string;
  authenticationComplete = false;
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
    this.showPublicService.confirmAccount(this.email, this.codeConfirm).subscribe(
      (confirmDto: ConfirmDto) => {
        this.authenticationComplete = true;
        if (confirmDto.discount === true) {
          this.isSuccessfully = true;
          this.result = 'Process account verification was successfully. Thank you for sign up';
        } else {
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
