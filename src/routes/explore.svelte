<script context="module">
	// fetch descriptions before the component is rendered
	export const load = async ({ fetch }) => {
		const descriptions = await fetch('/api/descriptions.json');
		const allDescriptions = await descriptions.json();

		return {
			props: {
				descriptions: allDescriptions
			}
		};
	};
</script>

<script>
	import BambooPack from '$lib/components/BambooPack.svelte';

	import data from '$lib/data/bamboo-methods.json';

	let height;

	export let descriptions;
</script>

<div class="chart-wrapper" bind:clientHeight={height}>
	<BambooPack {data} {height} {descriptions} />
</div>

<style>
	.chart-wrapper {
		height: calc(100vh - 10rem);
	}
</style>
