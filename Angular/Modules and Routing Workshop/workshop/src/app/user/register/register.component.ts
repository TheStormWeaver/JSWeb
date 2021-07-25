import { Component } from '@angular/core';
import { faEnvelope, faLock, faUser, faPhone } from "@fortawesome/free-solid-svg-icons"
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  icons = {
    faEnvelope,
    faLock,
    faUser,
    faPhone,
  }


  constructor(private userService: UserService) { }

  register(): void {
  }

}
