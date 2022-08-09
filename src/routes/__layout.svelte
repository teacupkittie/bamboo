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
	<meta property="og:description" content="A visual literary review of bamboo residential construction." />
	<meta property="og:image" content="https://bamboo.vivianwli.com/images/preview.png" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Bamboo housing" />
	<meta name="twitter:description" content="A visual literary review of bamboo residential construction." />
	<meta name="twitter:image" content="https://bamboo.vivianwli.com/images/preview.png" />
</svelte:head>

<!-- <div class="mobile">
	<h1>Hey, mobile user!</h1>
	<p>
		This project has yet to be implemented for smaller screens. In the meantime, please visit this
		page on a computer!
	</p>
</div> -->

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

{#if $page.url.pathname === '/'}
	<div class="background">
		<img class="background-left" src="images/bamboo-background-left.svg" alt="left half of bamboo background">
		<img class="background-right" src="images/bamboo-background-right.svg" alt="right half of bamboo background">
	</div>
{/if}

<style lang="scss">
	.label {
		text-decoration: none;
	}

	.outer-container {
		margin: 1rem;
	}

	.discussion-container {
		padding: 5vh max(10rem, calc(50vw - 30rem));
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

	.background {
		z-index: -1;
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

	@media only screen and (max-width: 64rem) {
		.background {
			display: none !important;
		}
	}
	
	@media only screen and (max-width: 36rem) {
		.background {
			display: block !important;
			position: absolute;
		}
		.background-left {
			display: none;
		}
		.background-right {
			position: absolute;
			top: 1rem;
			right: -1rem;
			height: 16rem;
			width: min-content;
		}
	}
</style>
