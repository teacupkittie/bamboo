<!-- Tooltip description -->
<script>
	export let name;
</script>

<div>{name}</div>

<style lang="scss">
	div {
		padding: 0.25rem 0.5rem;
		background-color: var(--light-highlight);
		border: 2px solid var(--lightest);
		color: var(--dark);
		border-radius: 5px;
		z-index: 2;
		display: block;
		width: min-content;
		white-space: nowrap;
	}
</style>
