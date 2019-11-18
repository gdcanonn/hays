# Tiendas 'El Baratón'

# Pasos para desplegar proyecto

Nota: En el computador a revisar esta aplicación debe estar instalado el NodeJs, npm y angular Cli

1. Descargar proyecto de GitHub https://github.com/gdcanonn/hays/tree/desarrollo-e-commerce
2. Ubicarce en la carpeta 'donPepe' por consola linea de comandos (cmd)
4. Ejecutar el siguiente comando 'npm install' -> Esto para instalar todas las dependencias
5. Ejecutar el siguiente comando 'npm start' -> Esto para arrancar la aplicacion por http://localhost:4200/
6. Ingresar por navedor (Chorme por ejemplo) a la dirección http://localhost:4200/

# Solución del problema

1. Se utilizó Angular 8 para la solución
2. Se utilizó para la UI la libreria de PrimeNG
3. La construcción del Menú se realiza dinamicamente por medio de un método recursivo. Este lee el archivo 'categories.json' y construye el menu. De esta forma si agregamos mas opciones al archivo JSON, al cargar la aplicación se mostrará la nueva opción.
4. La aplicación cuenta con el Header, Menu a la izquierda (con los filtros extras allí también) y con el Body en el centro donde se lista los productos tanto de la tienda como la del carrito de compras.
5. Para ver el carrito de compras se debe oprimir la imagen del carrito ubicado en la parte superior derecha.
6. Para visualizar de nuevo todos los productos de la tienda pordemos dar click sobre la imagen de la tiendita en el header o en el botón 'Ver todos los productos'.
7. Al dar click sobre cada opción del menú, este irá filtrando los producto segun la categoria seleccionada. (Lo realice así ya que encontre que en el archivo 'products.json' habian muchos productos asociados a categorias que tenian subniveles).
8. Las imagenes que se cargan para cada producto son aleatorias entre 7 imagenes ubicadas en /assets/images/products.
9. La aplicación es totalmente responsive. El menú cambia al estar en modo dispositivo movil. Aparecera en la parte superior izquierda un boton, el cual al darle click mostrará el menu de derecha hacia la izquierda con una pequeña animación.
10. Se hace uso de LocalStorage para guardar la información en el navegador y así asl cerrar el navegador y volver a ingresar poder conservar el carrito de compras.

# Estructura del codigo fuente

1. Dtos para mapero de informacion -> Lo encontramos en 'src/app/business/data/'
2. Paginas o componentes utilizados -> Lo encontramos en 'src/app/pages/'
3. Logica de negocio (TypeScript) -> Lo encontramos en 'src/app/services/'
4. Recursos: Archivos JSON -> Lo encontramos en 'src/assets/bd/'
5. Recursos: Imagenes de la aplicación -> Lo encontramos en 'src/assets/images/'