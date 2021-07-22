import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  user: IUser | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      tap(() => this.user = undefined),
      switchMap(({ id }) => this.userService.loadUser(this.activatedRoute.snapshot.params.id))
    ).subscribe(user => this.user = user)
    /*
    this.userService.loadUser(this.activatedRoute.snapshot.params.id).subscribe(user => {
      this.user = user
    });
    */
  }
}
