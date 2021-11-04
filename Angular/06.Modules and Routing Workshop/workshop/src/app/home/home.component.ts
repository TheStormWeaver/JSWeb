import { Component } from '@angular/core';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  icons = {
    faSignInAlt,
    faUserPlus,
  };

  get isLogged(): boolean {
    return this.userService.isLogged
  }

  constructor(private userService: UserService) { }

}
