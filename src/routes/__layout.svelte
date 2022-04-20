<script>
	import '../app.scss';
	import NavButton from '$lib/components/NavButton.svelte';
	import { page } from '$app/stores';
</script>

<div class="outer-container">
	<div class="label">BAMBOO HOUSING</div>

	<div class="container">
		<slot />
	</div>

	<div class="footer">
		{#if $page.url.pathname === '/'}
			<div class="easter-egg" />
			<NavButton align="right" text="EXPLORE" href="/explore" />
		{:else if $page.url.pathname === '/explore'}
			<NavButton align="left" text="INTRODUCTION" href="/" />
			<NavButton align="right" text="DISCUSSION" href="/discussion" />
		{:else if $page.url.pathname === '/discussion'}
			<NavButton align="left" text="EXPLORE" href="/explore" />
			<NavButton align="right" text="SHARE" href="/" />
		{/if}
	</div>
</div>

<style lang="scss">
	.outer-container {
		margin: 1rem;
	}
	.container {
		padding: 3rem 10rem;
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
