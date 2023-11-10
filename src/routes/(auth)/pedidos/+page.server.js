//import { error } from '@sveltejs/kit';
import { BASE_URL } from '../../../lib/utils.js';
import { fetchApi } from '../../../lib/fetchApi.js';

export const load = async ({ locals }) => {

  
  const getPedidos = async () => {
    return await fetchApi.get({ url: BASE_URL + "/pedidos", token: locals.token, resStatus: 200 });
  };
  
  const getProductos = async () => {
    return await fetchApi.get({ url: BASE_URL + "/productos", token: locals.token, resStatus: 200 });
  };

  const getClientes = async () => {
    return await fetchApi.get({ url: BASE_URL + "/clientes", token: locals.token, resStatus: 200 });
  };

  return {
    pedidos: getPedidos(),
    productos: getProductos(),
    clientes: getClientes(),
  };
};

export const actions = {
  addPedido: async ({ request, locals }) => {
    const formData = await request.formData();
    const cliente_id = formData.get('selectedCliente_id');
    const fecha = formData.get('fecha');
    const producto_id = formData.get('producto_id');
    const total_unidades = formData.get('total_unidades');
    const precio = formData.get('precio');
    
   
   
   console.log ( "Pedido:", cliente_id,fecha , producto_id, total_unidades, precio, locals.token,BASE_URL)
   
       
    }
/*
  try {
    const res = await fetchApi.post({
      url: BASE_URL + "/pedidos",
      token: locals.token,
      body: {
         "date":date,
         "date2":date2,
         "razon_social":razon_social,
         "producto":producto,
         "cantidad":cantidad,
         "precio":precio,
         
      },
      resStatus: 200
      });
  
    if (res.status === 200) {
      const datos = await res.json();
       cookies.set('Pedido', JSON.stringify({
         date:datos.date,
         date2:datos.date2,
         razon_social:datos.razon_social,
         producto:datos.producto,
         cantidad:datos.cantidad,
         precio:datos.precio,
        
       }), {
         httpOnly: true,
         path: '/',
         secure: true,
         sameSite: 'strict',
         maxAge: 60 * 60 * 24 // 1 day
       })   
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (err) {
    console.log('Error: ', err);
    throw error(500, 'Algo salió mal al agregar el pedido');
  }  
 },
*/
/*
delete: async ({ request, locals }) => {
  const formData = await request.formData();
  const id = formData.get('pedido_id');
  console.log("Pedido:",id,locals.token,BASE_URL)
},
  /*
  try {
    const res=await fetchApi.delete({
      url: BASE_URL + `/pedidos/${id}`,
      token: locals.token,
      body:{
        "id": id
      },
      resStatus: 200
      });
    if (res.status === 200) {
      const datos = await res.json();
       cookies.set('PedidoEliminado', JSON.stringify({
       id: datos.id
       }), {
        httpOnly: true,
        path: '/',
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // se requiere??
        })      
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (err) {
    console.log('Error: ', err);
    throw error(500, 'Algo salió mal al eliminar el pedido');
  }
},
*/

/*
editar: async ({ request, locals }) => {
  const formData = await request.formData();
  const id = formData.get('pedido_id');
  const date2 = formData.get('date2');
  const cantidad = formData.get('cantidad');

  // otros campos a editar ...
  
  console.log("Pedido:",id,date2,cantidad,locals.token,BASE_URL)
},
  /*
  try {
    const res = await fetchApi.patch({
      url: BASE_URL + `/pedidos/${id}`,
      token: locals.token,
      body: {
        "date2": date2,
        "cantidad": parseFloat(cantidad)
      },
      resStatus: 200
    });
  
    if (res.status === 200) {
      const datos = await res.json();
      cookies.set('PedidoActualizado', JSON.stringify({
      date2: datos.date2,
      cantidad: datos.cantidad
      }), {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // se requiere???
      })  
      return { success: true };
      } else {
      return { success: false };
    }
    } catch (err) {
    console.log('Error: ', err);
    throw error(500, 'Algo salió mal al actualizar el pedido'); 
  }}
*/

 };
