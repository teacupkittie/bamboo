<script>
	import BambooPack from '$lib/components/BambooPack.svelte';

	import data from '$lib/data/bamboo-methods.json';
</script>

<div class="chart-wrapper">
	<BambooPack {data} width="600" />
</div>

<style>
	.chart-wrapper {
		overflow: hidden;
	}
</style>
