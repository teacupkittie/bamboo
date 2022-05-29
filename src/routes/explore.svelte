<!-- Page that showcases the Bamboo circle pack viz! -->
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

	// A unique object is generated every time hashchange event is triggered, which causes the BambooPack to restart because it is keyed
	let unique;

	function restart() {
		unique = {};
	}
</script>

<!-- on hashchange, trigger a restart -->
<svelte:window on:hashchange={restart} />

{#key unique}
	<div class="chart-wrapper" bind:clientHeight={height}>
		<BambooPack {data} {height} {descriptions} />
	</div>
{/key}

<style>
	.chart-wrapper {
		height: min(50vw, 80vh);
	}
</style>
