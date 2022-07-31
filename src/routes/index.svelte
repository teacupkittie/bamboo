<script>
	import NavButton from '$lib/components/NavButton.svelte';
</script>

<!-- Title page! -->
<div class="content-wrapper">
	<div class="content">
		<h1 class="title">bamboo housing</h1>
		<div class="subtitle">A visual review of bamboo construction for residential use</div>
		<div class="label byline">BY VIVIAN LI</div>
		<p>
			The call for sustainable and affordable housing is clear. Can we diminish our ecological footprint while addressing a need
			for housing? When building with concrete, wood, and other conventional materials, we
			contribute to harmful environmental impacts: carbon emissions, excessive 
			water use, deforestation, and more. Bamboo is a unique
			alternative with rapid growth cycles, carbon-sequestering abilities, and mechanical
			strength. How is bamboo currently used in the built environment, and how can it flourish
			in the future?
		</p>
		<div class="explore"><NavButton align="right" text="EXPLORE" href="/explore" /></div>
	</div>
</div>
<div class="background">
	<img class="background-left" src="images/bamboo-background-left.svg" alt="left half of bamboo background">
	<img class="background-right" src="images/bamboo-background-right.svg" alt="right half of bamboo background">
</div>

<style>
	.title {
		font-size: 5rem;
		margin: 1rem 0 0 0;
		line-height: 6rem;
	}
	.subtitle {
		font-size: 1.5rem;
		padding-top: 1rem;
	}
	.byline {
		padding-top: 1rem;
	}
	.content-wrapper {
		display: flex;
		height: calc(100vh - 5rem);
		justify-content: center;
		align-items: center;
	}
	.content {
		text-align: center;
		width: max(48rem, 40vw);
	}
	.explore {
		width: min-content;
		margin: auto;
	}
	.background {
		position: fixed;
		top: 0;
		left: 0;
		display: grid;
		grid-template-columns: 1fr calc(max(48rem, 40vw) + 2rem) 1fr;
		height: 101vh;
		width: 101vw;
	}
	.background-left {
		align-self: end;
		grid-column: 1;
		grid-row: 1;
		padding: 0 0.75rem;
		box-sizing: border-box;
		width: min(100%, 30rem);
	}
	.background-right {
		align-self: start;
		justify-self: end;
		grid-column: 3;
		grid-row: 1;
		padding-top: 1rem;
		width: min(100%, 30rem);
	}
</style>
