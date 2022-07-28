import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SearchComponent } from './search/search.component';
import { ClienteComponent } from './cliente/cliente.component';
import { DialogClienteComponent } from './cliente/dialog/dialogcliente.component';
import { DialogDeleteComponent } from './common/delete/dialogdelete.component';
import { LoginComponent } from './login/login.component';
import { VentaComponent } from './venta/venta.component';
import { DialogVentaComponent } from './venta/dialog/dialogventa.component';
import { JwtInterceptor } from './security/jwt.interceptor';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './message/message.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from './services/chat.service';
import { CompanyComponent } from './company/company.component';
import { TagComponent } from './tag/tag.component';
import { ProductComponent } from './product/product.component';
import { DialogTagComponent } from './tag/dialog/dialogtag.component';
import { DialogCompanyComponent } from './company/dialog/dialogcompany.component';
import { DialogProductComponent } from './product/dialog/dialogproduct.component';
import { TypeUnitComponent } from './type-unit/type-unit.component';
import { DialogTypeUnitComponent } from './type-unit/dialog/dialogtype-unit.component';
import { MaterialModule } from './material.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { CompanyCardComponent } from './company-card/company-card.component';
import { TagCardComponent } from './tag-card/tag-card.component';
import { TypeUnitCardComponent } from './type-unit-card/type-unit-card.component';
import { DialogShopComponent } from './product/dialogShop/dialogshop.component';
import { ProductShopCardComponent } from './product-shop-card/product-shop-card.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ClienteComponent,
    DialogClienteComponent,
    DialogTagComponent,
    DialogProductComponent,
    DialogCompanyComponent,
    DialogDeleteComponent,
    DialogVentaComponent,
    DialogTypeUnitComponent,
    LoginComponent,
    VentaComponent,
    ChatComponent,
    MessageComponent,
    CompanyComponent,
    TagComponent,
    ProductComponent,
    TypeUnitComponent,
    ProductCardComponent,
    CompanyCardComponent,
    TagCardComponent,
    TypeUnitCardComponent,
    DialogShopComponent,
    ProductShopCardComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}//,ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
