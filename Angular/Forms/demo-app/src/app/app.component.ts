import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  isActive = false

  actiavteHandler(data: any): void {
    console.log(data)
  }

  toggleActive() {
    this.isActive = !this.isActive
  }
}
