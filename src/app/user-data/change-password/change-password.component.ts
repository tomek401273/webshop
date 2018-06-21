import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ChangePassword} from '../../model/change-password';
import {LogingService} from '../../services/loging.service';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  @ViewChild('form') private _passwords: NgForm;
  @ViewChild('error') private _error: SwalComponent;
  @ViewChild('success') private _success: SwalComponent;

  constructor(private logingService: LogingService,
              private router: Router) {
  }

  onSubmit() {
    const changePassword: ChangePassword = new ChangePassword(this.passwords.value.oldPassword, this.passwords.value.newPassword);
    this.logingService.changePassword(changePassword)
      .subscribe(
        () => {
          this._success.show();
          this.router.navigate(['/']);
        },
        () => {
          this._error.show();
        }
      );
  }

  get passwords(): NgForm {
    return this._passwords;
  }

  set passwords(value: NgForm) {
    this._passwords = value;
  }
}
