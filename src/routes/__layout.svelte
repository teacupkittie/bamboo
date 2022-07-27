<script context="module">
	// this runs before the layout is rendered, setting key to the URL path
	export const load = async ({ url }) => ({
		props: {
			key: url.pathname
		}
	});
</script>

<script>
	import '../app.scss';
	import NavButton from '$lib/components/NavButton.svelte';
	import { page } from '$app/stores';

	import PageTransition from '$lib/components/PageTransition.svelte';

	export let key;

	let padding = $page.url.pathname.substring(1);
	$: $page.url.pathname,
		setTimeout(() => {
			padding = $page.url.pathname.substring(1);
		}, 600);
</script>

<svelte:head>
	<title>Bamboo housing</title>
	<meta property="og:title" content="Bamboo housing" />
	<meta property="og:type" content="article" />
	<meta
		property="og:description"
		content="The call for sustainable and affordable housing is clear—people across the globe are witnessing a shortage of homes. How is bamboo currently being used in the built environment, and how can it flourish in the future?"
	/>
</svelte:head>

<div class="mobile">
	<h1>Hey, mobile user!</h1>
	<p>
		This project has yet to be implemented for smaller screens. In the meantime, please visit this
		page on a computer!
	</p>
</div>

<div class="outer-container">
	<a class="label" href="/">BAMBOO HOUSING</a>

	<div class={padding + '-container'}>
		<PageTransition refresh={key}>
			<slot />
		</PageTransition>
	</div>

	<div class="footer">
		{#if $page.url.pathname === '/'}
			<div class="easter-egg" />
			<div class="easter-egg" />
		{:else if $page.url.pathname === '/explore'}
			<NavButton align="left" text="INTRODUCTION" href="/" />
			<NavButton align="right" text="DISCUSSION" href="/discussion" />
		{:else if $page.url.pathname === '/discussion'}
			<NavButton align="left" text="EXPLORE" href="/explore" />
			<div class="easter-egg" />
		{/if}
	</div>
</div>

<style lang="scss">
	.label {
		text-decoration: none;
	}

	@media screen and (max-width: 1000px) {
		.outer-container {
			display: none;
		}
		.mobile {
			display: block !important;
		}
	}

	.mobile {
		display: none;
		padding: 2rem;
	}

	.outer-container {
		margin: 1rem;
	}

	.discussion-container {
		padding: 5vh 10rem;
	}
	.explore-container {
		padding: 5vh 10vw;
	}
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		display: grid;
		width: 100%;
		grid-template-columns: min-content min-content;
		justify-content: space-between;
		padding: 1.5rem;
		box-sizing: border-box;
	}
</style>
