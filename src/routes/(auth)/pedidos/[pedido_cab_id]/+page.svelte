<script>
	import { goto } from '$app/navigation';
	import { Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import Titulo from '$lib/componentes/titulo.svelte';
	export let data;
	export let form;
	export const { productos, clientes } = data;

	let titulo = 'Nuevo Pedido';
	let items = [];

	onMount(() => {
		if (form?.success) {
			Swal.fire({
				icon: 'success',
				title: form.message,
				backdrop: true,
				confirmButtonText: 'Volver',
				confirmButtonColor: 'rgb(69, 166, 175)'
			}).then((result) => {
				if (result.isConfirmed) {
					goto('/pedidos');
				}
			});
		}
	});

	const handleProductoChange = (event) => {
		const selectedIndex = event.target.selectedIndex;
		const selectedOption = event.target.options[selectedIndex];
		precio = selectedOption.getAttribute('data-precio');
	};

	const handleClienteChange = (event) => {
		const selectedIndex = event.target.selectedIndex;
		const selectedOption = event.target.options[selectedIndex];
		razon_social = selectedOption.getAttribute('data-razon_social');
	};

	let cliente_id;
	//let fecha = new Intl.DateTimeFormat('es',{day: 'numeric',month: 'numeric',year: 'numeric'}).format(new Date());
	let fecha = new Date().toISOString();
	let unidades;
	let producto_id;
	let precio;
	let razon_social;

	const handleAdd = (event) => {
		event.preventDefault();
		const newItem = {
			producto_id,
			unidades,
			precio
		};
		items = [...items, newItem];
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const pedido = {
			cliente_id,
			fecha,
			items
		};
		console.log(pedido);
	};

	const reset = () => {
		items = [];
		producto_id = 'Seleccionar Producto';
		unidades = '';
		precio = '';
	};

	const formClose = () => {
		goto(`/pedidos`);
	};
</script>

<main class="bg-gray-50 dark:bg-gray-900 sm:p-3 mx-1 w-full">
	<Titulo {titulo} />
	<div class="bg-white mx-auto p-1 pt-1 my-0 rounded-2xl border border-gray-300 shadow-md sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-custom 2xl:w-custom">
		<form method="POST">
			<div class="rounded-2xl border border-gray-300 p-3 my-0">
				<!----------- detalles items-------------->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
					<!--cabecera ( nombre cliente y fecha)--->
					<div class="mt-0">
						<label for="small" class="block mb-1 text-sm text-gray-900 dark:text-white">Cliente</label>
						<select
							id="small"
							name="cliente_id"
							bind:value={cliente_id}
							on:change={handleClienteChange}
							required
							class="block w-full h-7 mb-1 text-xs py-0 text-gray-900 border
									 border-gray-300 rounded bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700
									 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
									 dark:focus:border-primary-500"
						>
							<option selected>Seleccionar cliente</option>
							{#each clientes as cli}
								<option value={cli.cliente_id} data-razon_social={cli.razon_social} class="focus:ring-primary-500 focus:border-primary-500">{cli.razon_social}</option>
							{/each}
						</select>
					</div>
					<div>
						<label for="small" class="block mb-1 text-sm text-gray-900 dark:text-white">Fecha</label>
						<input
							id="small"
							type="text"
							maxlength="8"
							name="fecha"
							bind:value={fecha}
							class="block w-full h-7 mb-1 text-xs py-0 text-gray-900 border
						 border-gray-300 rounded bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700
						 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
						 dark:focus:border-primary-500"
						/>
					</div>
				</div>
				<!---------------------fin cabecera-------------->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-3">
					<!---------------------detalle items-------------->
					<div class="mt-0">
						<input type="hidden" name="items" value={JSON.stringify((items = items.map((item) => ({ ...item, precio: Number(item.precio) }))))} />
						<div class="mt-1">
							<label for="small" class="block mb-1 text-sm text-gray-900 dark:text-white">Productos</label>
							<select
								id="small"
								name="Productos"
								bind:value={producto_id}
								on:change={handleProductoChange}
								required
								class="block w-full h-7 mb-1 text-xs py-0 text-gray-900 border
								   border-gray-300 rounded bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700
								   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
								   dark:focus:border-primary-500"
							>
								<option selected>Seleccionar</option>
								{#each productos.datos as prod}
									<option value={prod.producto_id} data-precio={prod.precio}>{prod.producto_id} - {prod.nombre}</option>
								{/each}
							</select>
						</div>
					</div>
					<div>
						<label for="small" class="block my-1 text-sm text-gray-900 dark:text-white">Unidades</label>
						<input
							type="number"
							placeholder="Agregar Unidades"
							bind:value={unidades}
							class="block w-full rounded h-7 mb-2 text-xs text-gray-900 border
				border-gray-300 bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700
				dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
				dark:focus:border-primary-500"
							required
						/>
					</div>
					<div>
						<label for="small" class="block my-1 text-sm text-gray-900 dark:text-white">Precio </label>
						<input
							type="text"
							placeholder="Precio del producto"
							bind:value={precio}
							class="block w-full h-7 mb-1 text-xs text-gray-900 border
				border-gray-300 rounded bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700
				dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
				dark:focus:border-primary-500"
							readonly
							required
						/>
					</div>
				</div>
				<div>
					<Button on:click={handleAdd} data-sveltekit-preload-code="hover" size="sm" class="bg-primary-500 h-7 mb-2 md:mb-0 rounded-lg my-1 shadow-2xl hover:shadow-3xl">Agregar Item</Button>
				</div>
			</div>
			<!-----------fin detalles items-------------->

			<div class="mt-3">
				<!-------Area items-------------->
				<div class="Area-pedido">
					<Table hoverable={true} class="mx-auto border text-xs"
						><!-------Table-------------->
						<TableHead class="bg-primary-500 text-white" style="text-align: center;" theadClass="text-xs">
							<TableHeadCell class="py-2">Producto_id</TableHeadCell>
							<TableHeadCell class="py-2">Cliente</TableHeadCell>
							<TableHeadCell class="py-2">Unidades</TableHeadCell>
							<TableHeadCell class="py-2">Precio</TableHeadCell>
						</TableHead>
						<TableBody class="divide-y">
							{#each items as item (item.producto_id)}
								<TableBodyRow class="hover:bg-hover-gray-light" style="text-align: center;">
									<TableBodyCell class="py-1" style="font-weight: normal;">{item.producto_id}</TableBodyCell>
									<TableBodyCell class="py-1" style="font-weight: normal;">{razon_social}</TableBodyCell>
									<TableBodyCell class="py-1" style="font-weight: normal;">{item.unidades}</TableBodyCell>
									<TableBodyCell class="py-1" style="text-align: right; font-weight: normal;"
										>${item.precio.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableBodyCell
									>
								</TableBodyRow>
							{/each}
						</TableBody>
					</Table>
				</div>
			</div>
			<!-------fin Area items-------------->
			<div class="mt-1 mb-2">
				<Button on:click={formClose} data-sveltekit-preload-code="hover" size="sm" class="bg-primary-500 h-7 mb-2 md:mb-0 md:ml-2 rounded-lg my-1 shadow-2xl hover:shadow-3xl">Cancelar</Button>
				<Button on:click={reset} data-sveltekit-preload-code="hover" size="sm" class="bg-primary-500 h-7 mb-2 md:mb-0 md:ml-1 rounded-lg my-1 shadow-2xl hover:shadow-3xl">Actualizar</Button>
				<Button type="submit" on:submit={handleSubmit} data-sveltekit-preload-code="hover" size="sm" class="bg-primary-500 h-7 mb-2 md:mb-0 md:ml-1 rounded-lg my-1 shadow-2xl hover:shadow-3xl"
					>Nuevo Pedido</Button
				>
			</div>
		</form>
	</div>
</main>

<style>
	.Area-pedido {
		background-color: rgb(253, 251, 251);
		min-height: 150px;
		border: 1px solid #b8b6b6;
		border-radius: 4px;
		overflow: scroll;
	}
</style>
