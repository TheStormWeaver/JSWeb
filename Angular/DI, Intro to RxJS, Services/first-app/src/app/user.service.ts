import { Inject, Injectable } from "@angular/core";
import { myStringInjectionToken } from "./app.module";
import { IUser } from "./interfaces/user";

@Injectable()
export class UserService {
  users = [
    {
      name: 'Ivan',
      age: 20,
    },
    {
      name: 'Peter',
      age: 21,
    },
    {
      name: 'Stan',
      age: 22,
    },
  ];

  constructor(@Inject(myStringInjectionToken) myString: string) { 

  }

  addNewUserHandler(newUser: IUser): void {
    this.users.push(newUser)
  }
}
