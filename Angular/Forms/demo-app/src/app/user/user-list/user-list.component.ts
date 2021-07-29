import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
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
