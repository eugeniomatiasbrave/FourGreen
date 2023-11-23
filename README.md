
************************************* APP FOUR GREEN *******************************************************

App en Versel  https://four-green-p9ha6v7dw-eugeniomatiasbrave.vercel.app/

**** LOGIN ****** 
     * Menu: segun perfil. Menu dinamico......................................................OK

**** LOGOUT *****
**** API REST ***
    * usuarios.rest
	* productos.rest   
	* clientes.rest
    * Pedidos.rest.....
    * Pedidos_estado.rest
                
**** LIBRERIA CSS ************
    * Libreria CSS: Flowbite svelte

  
************** CRUD: *****************

     
***** TABLA DE PRODUCTOS:  (cerrar todo productos) ********************************************
       * /productos : 
            - Responsive.....................................................................Ok
            - GET............................................................................OK
            * ADD productos desde otra pagina /productos/add_productos ......................ok
            * EDIT productos desde otra pagina /productos/add_productos .....................ok
            * DELETE productos desde otra pagina /productos/add_productos ...................ok
            * Filtrar x nombre   ............................................................revisar con Adrian requiere mejoras
            * Ordenar por click en cabecera de columna:
                   * precio...................................revisar con adrian requiere mejoras
                   * Nombre...................................
                   * id ......................................

***API Productos.rest ****   

###
Recupera todos los productos
GET {{baseUrl}}/productos HTTP/1.1 

### 
Recupera todos los productos ordenados por precios de mayor a menor
los campos posibles para ordenar son: nombre, precio, producto_id
luego van : -> 1 es para orden ascendente y -1 para descendente
GET {{baseUrl}}/productos?sort=precio:-1 HTTP/1.1  

### 
// Recupera todos los productos que contengan la palabra ELO en el nombre. Ordena por nombre
GET {{baseUrl}}/productos?search=ELO HTTP/1.1 

###
// recupera todos los productos que contengan la palabra ELO en el nombre
// ordenados por el precio descendente
GET {{baseUrl}}/productos?search=ELO&sort=precio:-1

###
// recupera todos los productos con limit (cantidad de productos a recuperar) 
// y offset (los que saltea)
// ordenados por el id del producto
GET {{baseUrl}}/productos?offset=5&limit=5&sort=producto_id:1  

###
// recuperda los datos de un producto en particular con su :id en el path
GET {{baseUrl}}/productos/10

###
// para dar de alta un producto, en el boy va el json y devuelve los datos enviados más el id del producto
POST {{baseUrl}}/productos 

###
// para actualizar nombre y/o precio del producto, va el :id en el path y los campos en el body
PATCH {{baseUrl}}/productos/110 

###
//para eliminar un producto, va el :id en el path
DELETE {{baseUrl}}/productos/104 



**********************************************************************************************
      
            
    * Tabla de Gestion de Pedidos: 
            - Accones: 
                 - Add pedidos:
                      Nota:Una Cabecera (hasta cliente) y detalle (a partir de Producto). 
                      * Mas de un item por pedido 
                 - Edita (modifica pedido en detalle):.....a espera de Api  
             - Detalle de pedido:
             - Estado de Pedido:    
            
    * Tabla de Clientes: 
          - GET,POST,EDITE,DELETE,PATCH + filtro.
             Mejoras de codigo: (se puede mejor el codigo idem productos).
                     

  * A mejorar:
	        * Funcion que simplifiquen el selected
		    * TRY: En productos y clientes.
            * Success y message: Respuesta al CRUD en /clientes y /pedidos.
            * A mejorar, hacer un alert()...................................................ok

**** LOGO: ****
    *Colores de marca:



****16/11/23*********
1) Ver diseño que sea responsive
*  1.b - ver si vale la pena agregar una libreria UI  ...si
2) agregar o editar un registro en una página distinta (más allá de que sea modal)
3) Filtrar por nombre (Adrián me debe documentación)
4) Ordenar por click en cabecera de columna precio, nombre y id (Adrián me debe documentación)
******************




