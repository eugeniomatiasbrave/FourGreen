<script>
	import { goto } from '$app/navigation';
	import { Dropdown, Checkbox, Input, Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
	export let data;
	export const { productos, productosSearch, sortPrecio, searchSortPrecio, sortNombre, sortProducto_id } = data;
	import Titulo from '$lib/componentes/titulo.svelte';

	let titulo = 'Tabla de Productos';
	let searchTerm = '';
	let sortOrder = 1;
	let filteredPrecio = sortPrecio.datos;
	let filteredProductos = productosSearch.datos;
	let filteredSortNombre = sortNombre.datos;

	let info = sortProducto_id.datos;
	let filteredSortedId = info.sort((e, f) => e.producto_id - f.producto_id);

	const SortedProducto_id = (params) => {
		sortOrder = -sortOrder;
		let sort = params;
		let newOrder = [...filteredSortedId];
		if (sort === 1) {
			filteredSortedId = newOrder.sort((e, f) => e.producto_id - f.producto_id);
		} else if (sort === -1) {
			filteredSortedId = newOrder.sort((e, f) => f.producto_id - e.producto_id);
		}
		goto(`/productos?sort=producto_id:${sort}`);
	};

	const alternarSortId = () => {
		SortedProducto_id(sortOrder === 1 ? -1 : 1);
	};

	const applyFilter = (params) => {
		let search = params;
		filteredProductos = productosSearch.datos.filter((prod) => prod.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
		filteredSortedId = filteredProductos;
		goto(`/productos?search=${search}`); // analizar si es mas conveniente utilizar Invalidate ()...y si hay difrencias
	};

	const reset = () => {
		searchTerm = '';
		filteredSortedId = info.sort((e, f) => e.producto_id - f.producto_id);
		goto(`/productos`);
	};

	const OrderedPrecio = (params) => {
		sortOrder = -sortOrder;
		let sort = params;
		if (sort === 1) {
			filteredPrecio = sortPrecio.datos.sort((a, b) => a.precio - b.precio);
		} else if (sort === -1) {
			filteredPrecio = sortPrecio.datos.sort((a, b) => b.precio - a.precio);
		}
		filteredSortedId = filteredPrecio;
		goto(`/productos?sort=precio:${sort}`); // analizar si es mas conveniente utilizar Invalidate ()...y si hay difrencias
	};

	const alternarSortPre = () => {
		OrderedPrecio(sortOrder === 1 ? -1 : 1);
	};

	const sortedNombre = (params) => {
		sortOrder = -sortOrder;
		let sort = params;
		filteredSortNombre = sortNombre.datos.sort((a, b) => {
			const nameA = a.nombre.toUpperCase();
			const nameB = b.nombre.toUpperCase();
			if (nameA < nameB) {
				return -1 * sortOrder;
			}
			if (nameA > nameB) {
				return 1 * sortOrder;
			}
			return 0;
		});
		filteredSortedId = filteredSortNombre;
		goto(`/productos?sort=nombre:${sort}`); // analizar si es mas conveniente utilizar Invalidate ()...y si hay difrencias
	};

	const alternarSort = () => {
		sortedNombre(sortOrder === 1 ? -1 : 1);
	};

	let visibleColumns = {
		id: true,
		nombre: true,
		precio: true,
		editar: true,
		eliminar: true
	};

	// Función para alternar la visibilidad
	function toggleColumn(column) {
		visibleColumns[column] = !visibleColumns[column];
	}
</script>

<svelte:head>
	<title>FourGreens-Productos</title>
	<meta name="description" content="Productos" />
</svelte:head>
<main class="bg-gray-50 dark:bg-gray-900 m-0 w-full">
	<Titulo {titulo} />

	<!--------------------------Seccion tabla -->
	<div class="bg-white mx-auto p-1 pt-1 rounded-lg border border-gray-300 shadow-md w-full xl:w-1/2">
		<!----------------Div contenedor: tabla + add + Filtro--------->

		<div class="flex flex-col sm:flex-row justify-between items-center mx-auto">
			<div class="mb-2 sm:mb-0 w-full sm:w-auto">
				<Button href={`/productos/-1`} data-sveltekit-preload-code="hover" size="xs" class="bg-primary-500 rounded-lg m-0 h-7 px-3 w-full sm:w-auto ">
					<svg class="w-4 h-4 me-1 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
					</svg> Nuevo</Button
				>
			</div>
			<div class="flex items-center">
				<Input type="text" bind:value={searchTerm} maxlength="30" name="searchTerm" placeholder="Buscar Producto" required class="bg-white h-7 w-full sm:w-auto rounded-lg" />
				<Button size="xs" on:click={() => applyFilter(searchTerm)} class="bg-primary-500 h-7 ml-1 px-3 rounded-lg">Buscar</Button>
				<Button size="xs" on:click={reset} class="bg-primary-500 h-7 ml-1 px-0 w-32 sm:w-32 rounded-lg">Borrar Filtro</Button>
			</div>
		</div>
		<div class="overflow-x-auto">
			<!-------------------------------Nueva tabla Flowbite------->
			<Table hoverable={true} class="mx-auto mt-1 border text-xs">
				<TableHead class=" bg-primary-500 text-white" theadClass="text-xs">
					<!------------------------cabecera celdas-->
					<TableHeadCell class="p-0 m-0 w-0 border-r ">
						<Button class="bg-primary-500 w-0 h-0">👀</Button>
						<Dropdown class="w-48 p-1 space-y-1 text-sm ">
							<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
								<Checkbox bind:checked={visibleColumns.id} on:click={() => toggleColumn('id')}>Checked Id</Checkbox>
							</li>
							<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
								<Checkbox bind:checked={visibleColumns.nombre} on:click={() => toggleColumn('nombre')}>Checked Nombre</Checkbox>
							</li>
							<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
								<Checkbox bind:checked={visibleColumns.precio} on:click={() => toggleColumn('precio')}>Checked Precio</Checkbox>
							</li>
							<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
								<Checkbox bind:checked={visibleColumns.editar} on:click={() => toggleColumn('editar')}>Checked Editar</Checkbox>
							</li>
							<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
								<Checkbox bind:checked={visibleColumns.eliminar} on:click={() => toggleColumn('eliminar')}>Checked Eliminar</Checkbox>
							</li>
						</Dropdown>
					</TableHeadCell>

					{#if visibleColumns.id}
						<TableHeadCell class="py-2" align="left">
							<div class="flex items-center">
								Id<button on:click={alternarSortId} class="bg-primary-500 hover:bg-primary-500 rounded">
									{#if sortOrder === 1}
										<svg class="w-2.5 h-4 ms-1.5 text-white-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 8">
											<path stroke="currentColor" stroke-linecap="butt" stroke-linejoin="round" stroke-width="1" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7" />
										</svg>
									{:else}
										<svg class="w-2.5 h-4 ms-1.5 text-white-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 8">
											<path stroke="currentColor" stroke-linecap="butt" stroke-linejoin="round" stroke-width="1" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
										</svg>
									{/if}
								</button>
							</div>
						</TableHeadCell>
					{/if}

					{#if visibleColumns.nombre}
						<TableHeadCell class="py-2">
							<div class="flex items-center">
								Nombre
								<button on:click={alternarSort} class="bg-primary-500 hover:bg-primary-500 rounded">
									{#if sortOrder === 1}
										<svg class="w-2.5 h-4 ms-1.5 text-white-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 8">
											<path stroke="currentColor" stroke-linecap="butt" stroke-linejoin="round" stroke-width="1" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7" />
										</svg>
									{:else}
										<!-- SVG para la flecha ascendente -->
										<svg class="w-2.5 h-4 ms-1.5 text-white-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 8">
											<path stroke="currentColor" stroke-linecap="butt" stroke-linejoin="round" stroke-width="1" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
										</svg>
									{/if}
								</button>
							</div>
						</TableHeadCell>
					{/if}

					{#if visibleColumns.precio}
						<TableHeadCell class="py-2">
							<div class="flex items-center justify-end">
								Precio
								<button on:click={alternarSortPre} class="bg-primary-500 hover:bg-primary-500 rounded">
									{#if sortOrder === 1}
										<svg class="w-2.5 h-4 ms-1.5 text-white-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 8">
											<path stroke="currentColor" stroke-linecap="butt" stroke-linejoin="round" stroke-width="1" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7" />
										</svg>
									{:else}
										<!-- SVG para la flecha ascendente -->
										<svg class="w-2.5 h-4 ms-1.5 text-white-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 8">
											<path stroke="currentColor" stroke-linecap="butt" stroke-linejoin="round" stroke-width="1" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
										</svg>
									{/if}
								</button>
							</div>
						</TableHeadCell>
					{/if}

					{#if visibleColumns.editar}
						<TableHeadCell class="py-2"
							>Editar
							<span class="sr-only">Editar</span>
						</TableHeadCell>
					{/if}

					{#if visibleColumns.eliminar}
						<TableHeadCell class="py-2"
							>Eliminar
							<span class="sr-only">Eliminar</span>
						</TableHeadCell>
					{/if}
				</TableHead><!----------------------fin cabecera celdas-->
				<TableBody class="divide-y ">
					{#each filteredSortedId as prod}
						<TableBodyRow class=" hover:bg-hover-gray-light">
							<TableBodyCell class=" w-0 p-0 m-0" align="right" />

							{#if visibleColumns.id}
								<TableBodyCell class="py-2" align="left">{prod.producto_id}</TableBodyCell>
							{/if}

							{#if visibleColumns.nombre}
								<TableBodyCell class="py-2">{prod.nombre}</TableBodyCell>
							{/if}

							{#if visibleColumns.precio}
								<TableBodyCell class="py-2" style="text-align: right;">${prod.precio.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableBodyCell>
							{/if}

							{#if visibleColumns.editar}
								<TableBodyCell class="py-2">
									<a href={`/productos/${prod.producto_id}?action=editar`} data-sveltekit-preload-code="hover" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Editar</a>
								</TableBodyCell>
							{/if}

							{#if visibleColumns.eliminar}
								<TableBodyCell class="py-2">
									<a href={`/productos/${prod.producto_id}?action=eliminar`} data-sveltekit-preload-code="hover" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Eliminar</a>
								</TableBodyCell>
							{/if}
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</div>
	</div>
	<!----------------fin Div contenedor: tabla + add + Filtro--------->
</main>

<style>
</style>
