import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'src/app/services/shopping.service';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Product } from 'src/app/business/data/dtos';

@Component({
  selector: 'app-panel-list-products',
  templateUrl: './panel-list-products.component.html',
  styleUrls: ['./panel-list-products.component.css']
})
export class PanelListProductsComponent implements OnInit {

  // Atributos para comportamiento
  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;

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
    this.sortOptions = [
      { label: 'Precio', value: 'price' },
      { label: 'Cantidad', value: 'quantity' },
      { label: 'Disponibilidad', value: 'available' }
    ];
  }

  /**
   * Método para cuando se va a ordenar por Precio, Cantidad o Disponibilidad
   * @param event Evento con el valor a ordenar (Precio, Cantidad o Disponibilidad)
   */
  onSortChange(event) {
    this.sortField = event.value;
  }
  
  /**
   * Métod para ver todos los productos
   */
  seeAllProducts() {
    this.shopping.seeAllProducts();
  }

  /**
   * Método para agregar un producto al carrito
   * @param product El producto a agregar al carrito
   */
  addToCart(product: Product) {
    this.shopping.addToCart(product);
  }
  
}
