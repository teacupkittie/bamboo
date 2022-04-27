<script>
	export let name;
	export let className;
</script>

<div class={className}>{name}</div>

<style lang="scss">
	div {
		padding: 1rem;
		background-color: var(--lighter);
		z-index: 2;
		display: none;
	}

	.active {
		display: block;
	}
</style>
