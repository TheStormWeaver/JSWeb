import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  icons = {
    faEnvelope,
    faLock,
  };

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) {}

  login(email: string, password: string): void {
    this.userService.login(email, password);
    const redirectUrl = this.activatedRoute.snapshot.queryParams.redirectUrl || "/" //used for redirecting after a successful login to the page the user was trying to acess
    this.router.navigate([redirectUrl]);
  }
}
