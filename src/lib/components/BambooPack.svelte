<script>
	// @ts-nocheck

	export let descriptions;

	import { pack, hierarchy } from 'd3-hierarchy';
	export let data;

	const move = (x, y) => `transform: translate(${x}px, ${y}px`;

	export let margins = {
		// typical d3 margin convention
		top: 20,
		right: 20,
		bottom: 20,
		left: 20
	};

	export let height;

	$: width = height;
	$: mainWidth = width - margins.right - margins.left;
	$: mainHeight = height - margins.top - margins.bottom;

	$: packer = pack().size([mainWidth, mainHeight]).padding(30);
	$: root = hierarchy(data)
		.sum(() => {
			return 1;
		})
		.sort((a, b) => b.depth - a.depth);
	$: circlePack = packer(root);
	$: descendants = circlePack.descendants();

	function loadDescription(f) {
		for (const d in descriptions) {
			console.log(descriptions[d].path);
			if (descriptions[d].path === '/../lib/data/' + f) {
				return descriptions[d].html;
			}
		}
		console.log('Description not found.');
	}

	let focus = 'overview';
	$: description = loadDescription(focus);
</script>

<div class="viz-container">
	<div class="description">
		{@html description}
	</div>

	<svg {width} {height}>
		<g style={move(margins.top, margins.left)}>
			{#each descendants as d}
				{#if d.data.children}
					<circle
						cx={d.x}
						cy={d.y}
						r={d.r}
						class="parent-circle {focus === d.data.src ? 'active' : ''}"
						stroke-dasharray="15 15"
						stroke-linecap="round"
						on:click={() => {
							focus = d.data.src;
						}}
					/>
				{:else}
					<circle
						cx={d.x}
						cy={d.y}
						r={d.r}
						class="baby-circle {focus === d.data.src ? 'active' : ''}"
						on:click={() => {
							focus = d.data.src;
						}}
					/>
				{/if}
			{/each}
		</g>
	</svg>
</div>

<style lang="scss">
	.viz-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	circle {
		transition: 0.4s;
		filter: drop-shadow(0px 0px 7px var(--primary-highlight));
		cursor: pointer;
	}
	.parent-circle {
		fill: rgba(224, 236, 190, 0.5);
		stroke: var(--primary-light);
		stroke-width: 0.5rem;
		&:hover {
			stroke: var(--primary);
		}
		&.active {
			stroke: var(--active);
			fill: var(--active-highlight);
		}
	}
	.baby-circle {
		fill: #ccdd9f;
		stroke-width: 0;
		&:hover {
			fill: var(--primary);
		}
		&.active {
			fill: var(--active);
		}
	}
	.description {
		overflow-y: scroll;
		padding-right: 2rem;
	}
</style>
