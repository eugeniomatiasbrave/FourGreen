import { error } from '@sveltejs/kit';
import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';
import { z } from 'zod';

const productoSchema = z.object({
  nombre: z.string().min(1),
  precio: z.number(),
});

export const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const data = {
      nombre: formData.get('nombre'),
      precio: parseFloat(formData.get('precio')),
    };

    const result = productoSchema.safeParse(data);

    if (!result.success) {
      console.log(result.error);
      throw error(400, 'Datos de formulario inválidos');
    }

    try {
      const res = await fetchApi.post({
        url: BASE_URL + '/productos',
        token: locals.token,
        body: {
          nombre: data.nombre,
          precio: data.precio
        },
        resStatus: 200
      });
      if (res.status === 200) {
        const datos = await res.json();
        return {
          success: true,
          message: 'Producto agregado correctamente!!!',
          productoAgregado: {
            nombre: datos.nombre,
            precio: datos.precio
          }
        };
      } else {
        //return { success: false };
      }
    } catch (err) {
      console.error('Error: ', err);
      throw error(500, 'Algo salió mal al agregar el producto');
    }
    return { success: true, message: 'Producto agregado correctamente!!!' };
  }
}