<script>
	import { Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	export let ruta;
	export let textoboton1;
	export let textoboton2;
</script>

<footer class="text-center mt-3 flex">
	<Button type="submit" class="bg-primary-500 h-8 mb-2 md:mb-0 rounded-lg shadow-md hover:shadow-lg w-full">{textoboton1}</Button>
	<Button on:click={() => goto(`/${ruta}`)} class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded-lg shadow-md hover:shadow-lg w-full">{textoboton2}</Button>
</footer>
