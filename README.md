******************\******************* APP FOUR GREEN **************************\*\*\***************************

App en Versel Deploy: https://four-green.vercel.app/

\***\* LOGIN \*\*\*\*** \* Menu: segun perfil. Menu dinamico......................................................OK

\***\* LOGOUT \*\*\*** \***_ API REST _**
_ usuarios.rest
_ productos.rest  
 _ clientes.rest
_ Pedidos.rest..... \* Pedidos_estado.rest

\***\* LIBRERIA CSS ****\*\******* \* Libreria CSS: Flowbite svelte

**************\*\*\*\*************** CRUD: **************************\*\*\*\***************************

**********\*\*\*********** TABLA DE PRODUCTOS:(cerrar todo productos)************\*\*\*\*************

       * /productos:
            * Responsive.....................................................................Ok
            * GET captura para tabala........................................................OK
            * PATCH, DELETE y POST desde /productos/[producto_id] ...........................OK
            * Filtrar x nombre   ............................................................OK
            * Ordenar por click en cabecera de columna:
                   * precio..................................................................OK
                   * Nombre..................................................................OK
                   * id (inicia ordenado por Id).............................................OK

            * Alert si la respuesta es 200...................................................OK
            * Alert en input en caso de excistir el producto Nombre desde Api rest...........OK
            * +error.svelte si la peticion no es 200 y si el esquema es incorrecto...........OK

GET {{baseUrl}}/productos
GET {{baseUrl}}/productos?sort=precio:-1  
GET {{baseUrl}}/productos?search=ELO  
GET {{baseUrl}}/productos?search=ELO&sort=precio:-1
GET {{baseUrl}}/productos?offset=5&limit=5&sort=producto_id:1  
GET {{baseUrl}}/productos/10
POST {{baseUrl}}/productos
PATCH {{baseUrl}}/productos/110
DELETE {{baseUrl}}/productos/104

**********\*\*\*\*********** TABLA DE CLIENTES:************************\*\*\*************************

        * /clientes: (cerrar clientes todo)
           * Responsive.....................................................................OK
           * GET captura para tabala........................................................OK
           * PATCH POST y DELETE /clientes/[cliente_id] juntos en +page.....................OK
           * Filtrar x nombre + borrar filtro  .............................................OK
           * Ordenar por click en cabecera de columna:
                * Nombre....................................................................OK
                * id (inicia ordenado por Id)...............................................OK

           * Alert si la respuesta es 200...................................................OK
           * Alert en input en caso de excistir el cliente Nombre desde Api rest............OK
           * +error.svelte si la peticion no es 200 y si esquema es incorrecto..............OK
           * Alert cuit ....................................................................OK
           * Revisar los demas input y su esquemas..........................................OK

GET {{baseUrl}}/clientes // Recupera todos los productos
GET {{baseUrl}}/clientes?limit=5&offset=2 recupera todos los productos con la opción limit y offset
GET {{baseUrl}}/clientes/1 // recuperda los datos de un producto en particular con su :id en el path
POST {{baseUrl}}/clientes // para dar de alta un producto, en el boy va el json y devuelve los datos enviados más el id del producto
PATCH {{baseUrl}}/clientes/2 // para actualizar nombre y/o precio del producto, va el :id en el path y los campos en el body
DELETE {{baseUrl}}/clientes/3 //para eliminar un producto, va el :id en el path
GET {{baseUrl}}/clientes?sort=razon_social:-1 HTTP/1.1.......euge
GET {{baseUrl}}/clientes?sort=cliente_id:-1 HTTP/1.1 ........euge
GET {{baseUrl}}/clientes?search=ELO HTTP/1.1 ................euge

************\*\*\*\************* TABLA DE PEDIDOS:**********************\*\*\*\***********************

    * Tabla de Gestion de Pedidos:
           * Responsive.....................................................................
           * Detalle de pedido.............................................................
           * Agregar pedidos...............................................................
                Nota:Una Cabecera (hasta cliente) y detalle (a partir de Producto).
           * Mas de un item por pedido.....................................................
           * Editar (modifica pedido en detalle):..........................................
           * Eliminar pedido (modifica pedido en detalle):.................................
           * Estado de Pedido..............................................................
           * Filtrar pedidos x nombre .....................................................
           * Ordenar por click en cabecera de columna......................................?

\***\* Api pedidos \*\*\***
GET {{baseUrl}}/pedidos
GET {{baseUrl}}/pedidos?limit=2 //recup. todos los estados de los ped. con la opción limit y offset para realizar paginado
(en princ por la cant. de items no hace falta)
GET {{baseUrl}}/pedidos/38/detalle // Recupera el detalle del pedidos id
POST {{baseUrl}}/pedidos

\***\* Api estados pedido **\*****

GET {{baseUrl}}/pedidos_estado HTTP/1.1 // Recupera todos los estados de los pedidos
GET {{baseUrl}}/pedidos_estado?limit=5&offset=2 // recupera todos los estados de los pedidos con la opción limit y offset para realizar paginado (en principio por la cantidad de items no hace falta)
GET {{baseUrl}}/pedidos_estado/20 // recuperda los datos de un estado de pedido en particular con su :id en el path

---

\***\* LOGO: \*\***
\*Colores de marca:

\***\*16/11/23**\*\*\*****

1. Ver diseño que sea responsive

- 1.b - ver si vale la pena agregar una libreria UI ...si

2. agregar o editar un registro en una página distinta (más allá de que sea modal)
3. Filtrar por nombre (Adrián me debe documentación)
4. Ordenar por click en cabecera de columna precio, nombre y id (Adrián me debe documentación)

---
