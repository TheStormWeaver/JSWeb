import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUser } from './interfaces/user';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  users: IUser[] | undefined;
  errorLoadingUsers = false

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(search?: string): void {
    this.users = undefined;
    this.errorLoadingUsers = false
    this.userService.loadUsers(search).pipe(catchError(() => of([]))).subscribe(
      (users) => (this.users = users), //next function
      (error) => {
        console.error(error),
        this.errorLoadingUsers = true
      }, //error function
      () => console.log("load user stream completed") //completed function
    );
  }

  reloadButtonHandler() {
    this.loadUsers();
  }

  searchButtonHandler(searchInput: HTMLInputElement): void {
    const { value } = searchInput;
    this.loadUsers(value);
  }
}
