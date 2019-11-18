import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/business/data/dtos';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-panel-cart',
  templateUrl: './panel-cart.component.html',
  styleUrls: ['./panel-cart.component.css']
})
export class PanelCartComponent implements OnInit {

  nuevaCantidad: string;

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
  }

  /**
   * Método para calcular el total del carrito
   * @param product Producto a restar al total
   */
  removeProduct(product: Product) {
    this.shopping.quitToCart(product);
  }

  /**
   * Método para editar la cantidad de un producto
   */
  prepareEdition() {
    this.shopping.editarCantidad = true;
    this.nuevaCantidad = '';
  }

  /**
   * Método para editar la cantidad de un producto del carrito
   * @param product Producto a editar la cantidad
   */
  editProduct(product: Product) {
    this.shopping.editProduct(product, this.nuevaCantidad);
  }

  /**
   * Método para cancelar edicion de un producto del carrito
   */
  cancelEdition() {
    this.shopping.editarCantidad = false;
  }

  /**
   * Método para realizar la compra de los productos en el carrito
   */
  buyProducts() {
    this.shopping.buyProducts();
  }

}
