import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { HighlightDirective } from './highlight.directive';
import { MyIfDirective } from './my-if.directive';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SameValueDirective } from './same-value.directive';
import { RegisterComponent } from './register/register.component';

export const myStringInjectionToken = new InjectionToken("myString")

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NotFoundComponent,
    HighlightDirective,
    MyIfDirective,
    LoginComponent,
    SameValueDirective,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    UserModule,
    AppRoutingModule,
    FormsModule, //no reload on template sumbit
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: myStringInjectionToken,
      useValue: "Hello World!"
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
