import { Injectable } from '@angular/core';
import { Category, Item } from '../business/data/dtos';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  items: Item[];

  constructor() { }

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

        // Si dicha categoria tiene subniveles
        if (cat.sublevels && cat.sublevels.length > 0) {
          item.items = this.buildCategories(cat.sublevels);
        }
        listaItems.push(item);
    });

    return listaItems;
  }


}
