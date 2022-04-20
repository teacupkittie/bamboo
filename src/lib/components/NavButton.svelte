<script>
	// exported props
	export let text;
	export let align;
	export let href;

	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiArrowRightCircle from 'svelte-icons-pack/fi/FiArrowRightCircle';
	import FiArrowLeftCircle from 'svelte-icons-pack/fi/FiArrowLeftCircle';
	import FiCopy from 'svelte-icons-pack/fi/FiCopy';

	// determining which icon to use
	let icon = text === 'SHARE' ? FiCopy : align === 'left' ? FiArrowLeftCircle : FiArrowRightCircle;
</script>

<!-- Navigation buttons at the base of the page! -->
<a {href} sveltekit:prefetch sveltekit:noscroll>
	<div class="button {align}">
		<div class="label">{text}</div>
		<Icon className="icon" src={icon} />
	</div>
</a>

<style lang="scss">
	.button {
		display: grid;
		gap: 0.5rem;
	}
	.left {
		grid-template-columns: min-content min-content;
		.label {
			grid-column-start: 2;
		}
	}
	.right {
		grid-template-columns: min-content min-content;
		:global(.icon) {
			grid-column-start: 2;
		}
	}
	:global(.icon) {
		color: var(--light);
		align-self: center;
		grid-row-start: 1;
	}

	a {
		text-decoration: none;
	}

	a:hover {
		text-shadow: 0 0 0.5rem var(--primary);
		.label {
			color: var(--primary);
			transition: 0.3s;
		}
		:global(.icon) {
			color: var(--primary);
			transition: 0.3s;
		}
	}
</style>
