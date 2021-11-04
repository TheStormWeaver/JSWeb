import { Component } from '@angular/core';
import { IUser } from './interfaces/user';
import { UserService } from './user.service';
import { of } from "rxjs"
import { map } from "rxjs/operators"

Promise.resolve(1000).then(x => x + 1).then(console.log) // the same as the one in line 9 to 11

of(1000).pipe(map(x => x + 1)).subscribe((x) => { // the same as the one on line 7
  console.log(x) 
})


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public userService: UserService) { }
}
