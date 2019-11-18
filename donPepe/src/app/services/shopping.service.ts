import products_bd from '../../assets/bd/products.json';
import categories_bd from '../../assets/bd/categories.json';

import { Injectable } from '@angular/core';
import { Category, Item, Product, Shop } from '../business/data/dtos';
import { MessageService } from 'primeng/components/common/messageservice';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  // Atributos de negocio
  shop: Shop = new Shop();
  items: Item[];
  productsAll: Product[] = [];
  products: Product[] = [];
  productsCart: Product[] = [];

  // Atributos para comportamiento
  menuActivo: boolean = false;
  seeCart: boolean = false;
  totalCart: number = 0;
  editarCantidad: boolean = false;
  categorySelected: Item;

  // Filtros seleccionados  
  dispSelected: boolean;
  cantidadSelected: string;
  preciosSelected: string;

  constructor(
    private messageService: MessageService
  ) { }

  /**
   * Método encargado de invocar el metodo recursivo para crear la lista y luego asignarla a items
   * @param categories Lista de categorias a procesar
   */
  setItemsToShowCategories(categories: Category[]) {
    this.items = this.buildCategories(categories);
  }

  /**
   * Método para construir el menu recursivamente según la bd de categorias
   * @param categories JSON de categorias
   */
  buildCategories(categories: Category[]) {
    let listaItems: Item[] = [];

    categories.forEach(cat => {
      const item = new Item();
      item.id = cat.id;
      item.label = cat.name;
      item.command = (event) => { this.onClickItemMenu(event.item); };

      // Si dicha categoria tiene subniveles
      if (cat.sublevels && cat.sublevels.length > 0) {
        item.items = this.buildCategories(cat.sublevels);
      }
      listaItems.push(item);
    });

    return listaItems;
  }

  /**
   * Método para realizar evento cuando den click en algun item
   * @param item El item al que se le ha realizado el evento
   */
  onClickItemMenu(item: Item) {
    this.categorySelected = item;
    this.seeCart = false;

    this.products = this.productsAll.filter(p => this.getPredicate(p));
  }

  /**
   * Método para asignar todos los productos de la tienda
   * @param products Todos los productos de la tienda
   */
  setAllProducts(products: Product[]) {
    this.setRamdomImgPath(products);
    this.productsAll = products;
    this.products = products;
  }

  /**
   * Métod para ver todos los productos
   */
  seeAllProducts() {
    this.categorySelected = null;

    if (!this.categorySelected && this.dispSelected == null && this.cantidadSelected == null) {
      this.products = this.productsAll;      
    } else {
      this.products = this.productsAll.filter(p => this.getPredicate(p));
    }
  }

  /**
   * Método para poner imagenes aleatorias a a los productos de la tienda
   * @param products Productos a procesar
   */
  setRamdomImgPath(products: Product[]) {
    products.forEach(prod => {
      prod.pathImg = "assets/images/products/producto-" + (Math.floor(Math.random() * 7) + 1) + ".png";
    });
  }

  /**
   * Método para obtener el total de productos que hay en el carrito
   * @returns Cantidad de productos en el carrito
   */
  getQuantityProductsCart() {
    let contador = 0;
    this.productsCart.forEach(prod => {
      contador += prod.quantity;
    });
    return contador;
  }

  /**
   * Método para agregar un producto al carrito
   * @param product El producto a agregar al carrito
   */
  addToCart(product: Product) {
    const prod = this.productsAll.find(p => p.id === product.id);

    if (prod && !prod.available) { // Valida si el producto esta disponible
      this.messageService.add({ severity: 'warn', summary: 'Operacion no permitidad', detail: 'No hay disponibilidad de este producto', life: 2000 });
    } else if (prod && prod.quantity - 1 > 0) { // Valida que aun exista inventario en stock

      const prodCart = this.productsCart.find(p => p.id === prod.id);
      if (prodCart) { // Valida si el producto ya existe en el carrito
        prodCart.quantity++;
        this.sumarAtotal(prodCart.price, 1);
      } else {
        const prodCartNew = Object.assign({}, prod);
        prodCartNew.quantity = 1;
        this.productsCart.push(prodCartNew);
        this.sumarAtotal(prodCartNew.price, 1);
      }

      // Resta del stock de productos
      prod.quantity--;
    }

    // Guarda datos en LocalStorage
    this.saveInLocalStorage();
  }

  /**
  * Método para calcular el total del carrito
  * @param product Producto a restar al total
  */
  quitToCart(product: Product) {
    const prodToQuit = this.productsCart.find(p => p.id === product.id);

    if (prodToQuit.quantity === 1) { // Si es el ultimo en eliminar
      const index: number = this.productsCart.indexOf(prodToQuit);
      if (index !== -1) {
        this.productsCart.splice(index, 1);
        this.restarAtotal(prodToQuit.price, 1);
      }
    } else {
      prodToQuit.quantity--;
      this.restarAtotal(prodToQuit.price, 1);
    }

    // Devuelve el producto al stock    
    const prod = this.productsAll.find(p => p.id === product.id);
    prod.quantity++;
    
    // Guarda datos en LocalStorage
    this.saveInLocalStorage();
  }

  /**
   * Método para editar la cantidad de un producto del carrito
   * @param product Producto a editar la cantidad
   * @param nuevaCantidad La nueva cantidad a editar en el producto
   */
  editProduct(product: Product, nuevaCantidad: string) {
    const newQuant = +nuevaCantidad;
    if (nuevaCantidad && !isNaN(newQuant)) { // validad si es un número

      // Valida si la cantidad nueva si esta en stock
      const prodGn = this.productsAll.find(p => p.id === product.id);
      if (newQuant > prodGn.quantity) {
        this.messageService.add({ severity: 'error', summary: 'Operacion no permitidad', detail: 'No hay suficiente stock para la nueva cantidad solicitada', life: 2000 });
      } else {
        // Resta el valor anterior que había solicitado y restaura el stock del producto
        const prodCart = this.productsCart.find(p => p.id === product.id);
        this.restarAtotal(prodCart.price, prodCart.quantity);
        prodGn.quantity += prodCart.quantity;

        // Realiza nueva operacion: Resta del stock del producto y suma al total
        prodGn.quantity = prodGn.quantity - newQuant;
        prodCart.quantity = newQuant;
        this.sumarAtotal(prodGn.price, newQuant);

        this.editarCantidad = false;
       
        // Guarda datos en LocalStorage
        this.saveInLocalStorage();
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Operacion no permitidad', detail: 'La cantidad debe ser numérica', life: 2000 });
    }
  }

  /**
   * Método para calcular el total del carrito
   * @param price Precio a sumar al total
   * @param cantidad La cantidad a restar
   */
  sumarAtotal(price: string, cantidad: number) {debugger
    const priceSplit = price.split("$");
    const priceNum = priceSplit[1].replace(",", ".");
    this.totalCart += (+priceNum * cantidad);
    this.totalCart = +this.totalCart.toFixed(3);
  }

  /**
   * Método para calcular el total del carrito
   * @param price Precio a restar al total
   * @param cantidad La cantidad a restar
   */
  restarAtotal(price: string, cantidad: number) {
    const priceSplit = price.split("$");
    const priceNum = priceSplit[1].replace(",", ".");
    this.totalCart -= (+priceNum * cantidad);
    this.totalCart = +this.totalCart.toFixed(3);
  }

  /**
   * Método para obtener el total del carrito formateado
   */
  getTotalCart() {
    return "$" + this.totalCart.toString().replace(".", ",");
  }

  /**
   * Método para realizar la compra de los productos en el carrito
   */
  buyProducts() {    
    // Inicializa la tienda
    this.inicializar();
    
    localStorage.clear();
    this.messageService.add({ severity: 'success', summary: 'Compra realizada', detail: 'Su compra a sido realizada exitosamente', life: 2000 });
  }

  /**
   * Método para aplicar los filtros adicionales
   */
  applyFilters() {
    if (!this.categorySelected && this.dispSelected == null && this.cantidadSelected == null && this.preciosSelected == null) {
      this.products = this.productsAll;      
    } else {
      this.products = this.productsAll.filter(p => this.getPredicate(p));
    }
  }

  /**
   * Método para construir predicado dinamicamente segun los flitros que apliquen
   * @param p El producto a validar con los filtros dados
   */
  getPredicate(p: Product): boolean{
    let predicate: boolean = true;

    if (this.categorySelected) {
      predicate = predicate && p.sublevel_id == this.categorySelected.id;
    }
    if (this.dispSelected != null) {
      predicate = predicate && p.available == this.dispSelected;
    }
    if (this.cantidadSelected != null) {
      const cantSplit = this.cantidadSelected.split("-");
      const min = +cantSplit[0];
      const max = +cantSplit[1];
      predicate = predicate && (p.quantity >= min && p.quantity <= max);
    }
    if (this.preciosSelected != null) {
      const cantSplit = this.preciosSelected.split("-");
      const min = +cantSplit[0];
      const max = +cantSplit[1];
        
      const priceSplit = p.price.split("$");
      const priceNum = priceSplit[1].replace(",", ".");
      const priceProd = +priceNum;

      predicate = predicate && (priceProd >= min && priceProd <= max);
    }
    return predicate;
  }

  /**
   * Método para inicializar la tienda
   */
  inicializar() {
    const products_shop = products_bd;
    const categories_shop = categories_bd;

    // Se inicializa la tienda con los productos y categorias de los JSONs
    this.shop.products = products_shop.products;
    this.shop.categories = categories_shop.categories;

    // Inicializa la tienda
    this.setItemsToShowCategories(this.shop.categories);
    this.setAllProducts(this.shop.products);
    this.productsCart = [];
    this.totalCart = 0;
  }

  /**
   * Método para almacenar la informacion en localstorage, esto para cuando cierren y abran el navegador mantenga los datos del carrito o lo realizado
   */
  saveInLocalStorage() {
    localStorage.shop = JSON.stringify(this.shop);
    localStorage.productsAll = JSON.stringify(this.productsAll);
    localStorage.products = JSON.stringify(this.products);
    localStorage.productsCart = JSON.stringify(this.productsCart);
    localStorage.totalCart = this.totalCart;
    localStorage.menuActivo = this.menuActivo;
    localStorage.seeCart = this.seeCart;
  }

}
