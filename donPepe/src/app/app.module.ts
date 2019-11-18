import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingService } from './services/shopping.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { PanelCartComponent } from './pages/panel-cart/panel-cart.component';
import { PanelFiltersComponent } from './pages/panel-filters/panel-filters.component';
import { PanelListProductsComponent } from './pages/panel-list-products/panel-list-products.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/components/common/messageservice';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PanelCartComponent,
    PanelFiltersComponent,
    PanelListProductsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    PanelMenuModule,
    ButtonModule,
    DataViewModule,
    DropdownModule,
    PanelModule,
    FormsModule,
    ToastModule,
    InputTextModule
  ],
  providers: [ShoppingService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
