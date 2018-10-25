import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDisplayComponent } from './components/product-display/product-display.component';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ProductDisplayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [], // use '@Injectable providedIn' now
  bootstrap: [AppComponent]
})
export class AppModule { }
