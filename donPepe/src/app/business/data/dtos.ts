/**
 * Clase DTO que representa la tienda
 */
export class Shop {
    products?: Product[];
    categories?: Category[];
}

/**
 * Clase DTO que representa la información de un Producto
 */
export class Product {
    quantity: number;
    price: string;
    available: boolean;
    sublevel_id: number;
    name: string;
    id: string;
}

/**
 * Calse DTO que representa la información de una categoría
 */
export class Category {
    id: number;
    name: string;
    sublevels?: Category[];
}

/**
 * Calse DTO que representa la información de un Item a mostrar en el menu de categorias
 */
export class Item {
    id?: number;
    label: string;
    items?: Item[];
}