import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /*
  title = 1;

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

  buttonClickHandler(): void {
    const current = this.title++
    this.users.push({
      name: `Ivan ${current}`,
      age: 20 + current
    })
  }
  */

  constructor() {
    debugger;
  }

  ngOnInit(): void {
    debugger
  }

  ngAfterViewInit():void {
    debugger
  }

  title = '1';

  classes = ['test', 'test1'];

  showText = true;

  changeTitleHandler(inputEl: HTMLInputElement): void {
    this.title = inputEl.value;
    inputEl.value = '';
  }

  /*
  toggleText(event: MouseEvent): void {
    this.classes.push("test" + this.title++)
    event.preventDefault()
    this.showText = !this.showText
  }
  */
}
