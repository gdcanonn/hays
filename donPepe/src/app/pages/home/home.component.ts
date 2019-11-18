import categories_bd from '../../../assets/bd/categories.json';

import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { ShoppingService } from 'src/app/services/shopping.service';


@Component({
  selector: 'app-home',
  animations: [
    trigger('openCloseMenu', [
      state('true', style({ left: '0' })),
      state('false', style({ left: '-100%' })),
      transition('false <=> true', animate(300))
    ]),
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**
   * Constructor del componente para inicializar recursos necesarios
   * @param shopping Recurso de servicio de la tienda
   */
  constructor(
    public shopping: ShoppingService
  ) { }

  /**
   * Método para inicializar el componente
   */
  ngOnInit() {
    if (typeof(Storage) !== 'undefined') { // Si existe storage en el navegador
      if (!localStorage.productsAll && !localStorage.products && !localStorage.productsCart && !localStorage.items && !localStorage.totalCart) {
        this.shopping.inicializar();
      } else {
        if (localStorage.shop) {
          this.shopping.shop = JSON.parse(localStorage.shop || []);
        }
        if (localStorage.productsAll) {
          this.shopping.productsAll = JSON.parse(localStorage.productsAll || []);
        }
        if (localStorage.products) {
          this.shopping.products = JSON.parse(localStorage.products || []);
        }
        if (localStorage.productsCart) {
          this.shopping.productsCart = JSON.parse(localStorage.productsCart || []);
        }
        if (localStorage.totalCart) {
          this.shopping.totalCart = +localStorage.totalCart;
        }
        if (localStorage.menuActivo) {
          this.shopping.menuActivo = localStorage.menuActivo;
        }
        if (localStorage.seeCart) {
          this.shopping.seeCart = localStorage.seeCart;
        }

        // Los items (categorias) las reconstruye de nuevo
        const categories_shop = categories_bd;
        this.shopping.shop.categories = categories_shop.categories;
        this.shopping.setItemsToShowCategories(this.shopping.shop.categories);
      }
    } else {
      this.shopping.inicializar();
    }
  }

  /**
   * Método para mostrar u ocultar el menu cuando esta en modo celular
   */
  toggleMenu() {
    if (!this.shopping.menuActivo) {
      this.shopping.menuActivo = true;
    } else {
      this.shopping.menuActivo = false;
    }
  }

  /**
   * Método para obtener el total de productos que hay en el carrito
   * @returns Cantidad de productos en el carrito
   */
  getQuantityProductsCart() {
    return this.shopping.getQuantityProductsCart();
  }

  /**
   * Método para ver carrito de compras
   */
  onSeeCart() {
    this.shopping.seeCart = true;
  }

  /**
   * Método para ver todos los productos de la tienda
   */
  onSeeShop() {
    this.shopping.seeCart = false;
    this.shopping.seeAllProducts();
  }

}
