import { error, redirect } from '@sveltejs/kit';
import { BASE_URL } from '../../lib/utils.js';
import {fetchApi} from '../../lib/fetchApi.js';
//import { date } from 'zod';

export const actions = {
	login: async ({ cookies, request }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		try {
			
			const res = await fetch(BASE_URL+"/usuarios/login", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({
					"email": username,
					"clave": password
				})
			});
			if (res.status === 200) {
				const datos = await res.json();
				cookies.set('AuthorizationToken', `Bearer ${datos.access_token}`, {
					httpOnly: true,
					path: '/',
					secure: true,
					sameSite: 'strict',
					maxAge: 60 * 60 * 24 // 1 day
				})
				cookies.set('Usuario', JSON.stringify({
					usuario_id: datos.usuario_id,
					nombre: datos.nombre
				}), {
					httpOnly: true,
					path: '/',
					secure: true,
					sameSite: 'strict',
					maxAge: 60 * 60 * 24 // 1 day
				})
			} else {
				return {success: false}
				
			}
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong logging in');
		}
		throw redirect(303, '/');

	},

	registro: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('username');
		const clave = formData.get('password');
		
		
		try {
	  // quité el const res = ...//
		  await fetchApi.post({url: BASE_URL + "/usuarios/login", token: locals.token, body:{
			 "email": email,
			 "clave": clave
			
			}, resStatus: 200})
			return { success: true }
		} catch (err) {
		  console.log('Error: ', err);
		  throw error(500, 'Something went wrong logging in');
		}
	  }
};