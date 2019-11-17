import products_bd from '../../../assets/bd/products.json';
import categories_bd from '../../../assets/bd/categories.json';

import { Component, OnInit } from '@angular/core';
import { Product, Shop } from 'src/app/business/data/dtos.js';
import { ShoppingService } from 'src/app/services/shopping.service.js';
import { trigger, state, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-home',
  animations: [
    trigger('openCloseMenu', [
      state('true', style({ left: '0' })),
      state('false', style({ left: '-100%' })),
      transition('false <=> true', animate(500))
    ]),
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Atributos de negocio
  shop: Shop = new Shop();

  // Atributos para comportamiento
  menuActivo: boolean = false;

  constructor(
    public shopping: ShoppingService
  ) { }

  ngOnInit() {
    const products_shop = products_bd;
    const categories_shop = categories_bd;
    
    // Se inicializa la tienda con los productos y categorias de los JSONs
    this.shop.products = products_shop.products;
    this.shop.categories = categories_shop.categories;

    // Contruye las Categorias
    this.shopping.setItemsToShowCategories(this.shop.categories);
  }

  toggleMenu() {
    if (!this.menuActivo) {
      this.menuActivo = true;
    } else {
      this.menuActivo = false;
    }
  }

}
