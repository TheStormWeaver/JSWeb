import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(formData: any) {
    if(formData.valid) {
      console.log(formData.value)
      this.authService.register(formData.value.email, formData.value.password)
    }
  }

}
