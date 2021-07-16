import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from '../interfaces/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {

  @Input() userArray: IUser[] = []
  @Output() addUser = new EventEmitter<IUser>()

  constructor() { }

  ngOnInit(): void {
  }

  addNewUser(userNameInpit: HTMLInputElement, userAgeInpit: HTMLInputElement): void {
    const { value: name } = userNameInpit
    const { valueAsNumber: age } = userAgeInpit

    this.addUser.emit({name, age})

    userNameInpit.value = ""
    userAgeInpit.value = ""
  }
}
