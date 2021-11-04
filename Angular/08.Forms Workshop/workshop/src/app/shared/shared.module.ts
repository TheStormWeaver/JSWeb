import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WelcomeMessageComponent } from './welcome-message/welcome-message.component';
import { RouterModule } from '@angular/router';
import { CustomValidatorDirective } from './custom-validator.directive';


@NgModule({
  declarations: [
    WelcomeMessageComponent,
    CustomValidatorDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
  ],
  exports: [
    WelcomeMessageComponent,
    CustomValidatorDirective
  ],
})
export class SharedModule { }
