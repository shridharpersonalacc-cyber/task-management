import { NgModule, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CheckAngularVirtualScroll } from './angular-functions/virtual-scrolling-functions/check-angular-virtual-scroll/check-angular-virtual-scroll';
import { AuthLogin } from './auth-user/auth-login/auth-login';
import { Appregistration } from './angular-functions/reactive-forms-functions/appregistration/appregistration';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SignalExample } from './angular-functions/signals-functions/signal-example/signal-example';

@NgModule({
  declarations: [
    App,
    CheckAngularVirtualScroll,
    AuthLogin,
    Appregistration,
    SignalExample,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
    /*  ---------- ngRx Flow ---------------
    StoreModule.forRoot({ products: productReducer }),
    EffectsModule.forRoot([ProductEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    */
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
