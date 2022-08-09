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
	}
	.content {
		text-align: center;
		width: max(48rem, 40vw);
		margin: auto 0;
	}
	.explore {
		width: min-content;
		margin: auto;
	}
	
	@media only screen and (max-width: 52rem) {
		.title {
			font-size: 3.75rem;
			line-height: 4.5rem;
		}
		.subtitle {
			font-size: 1.1rem;
			padding-top: 1rem;
		}
		.content {
			margin: auto 3rem;
		}
	}

	@media only screen and (max-width: 36rem) {
		.content {
			margin: 12rem 2rem 5rem 2rem;
		}
		.content-wrapper {
			height: 100%;
		}
	}


</style>
