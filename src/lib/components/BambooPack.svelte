<!-- BambooPack visualization component -->
<script>
	// @ts-nocheck

	export let descriptions;

	import Tooltip from '$lib/components/Tooltip.svelte';
	import { pack, hierarchy } from 'd3-hierarchy';

	// svelte imports
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';

	// takes in data, a json file
	export let data;

	// setting up the position for the circle pack
	const move = (x, y) => `transform: translate(${x}px, ${y}px`;

	export let margins = {
		// typical d3 margin convention
		top: 30,
		right: 30,
		bottom: 30,
		left: 30
	};

	export let height;

	$: width = height;
	$: mainWidth = width - margins.right - margins.left;
	$: mainHeight = height - margins.top - margins.bottom;

	// creating the circle pack
	$: packer = pack().size([mainWidth, mainHeight]).padding(30);
	$: root = hierarchy(data)
		.sum(() => {
			return 1;
		})
		.sort((a, b) => b.depth - a.depth);
	$: circlePack = packer(root);
	$: descendants = circlePack.descendants();

	// loads a specific description based on the bubble that is actively focused
	function loadDescription(f) {
		for (const d in descriptions) {
			if (descriptions[d].path === '/../lib/data/' + f) {
				return { name: descriptions[d].meta.name, content: descriptions[d].html };
			}
		}
		console.log('Description not found.');
	}

	// focus is on overview when the visualization is first rendered UNLESS it's specified
	let focus = browser ? location.hash.substring(1) || 'overview' : 'overview';

	// description is loaded based on the focused bubble
	$: description = loadDescription(focus);

	// determines what the user is hovering over
	let hoverfocus = '';

	// in the case that x and y position aren't set, the cursor should fall back on a position that is out of view -- in this case, (-500, -500)
	let m = { x: -500, y: -500 };

	// handles clicks on the different circles, setting the active circle and the URL hash
	const handleClick = async (src) => {
		focus = src;
		await goto('#' + focus);
	};
</script>

<div class="viz-container" on:mousemove={(e) => (m = { x: e.clientX, y: e.clientY })}>
	<!-- description that corresponds to the active bubble -->
	<div class="description">
		<h1>{description.name}</h1>
		<!-- key block re-creates the content block, which sets scrollTop to 0 -->
		{#key description.content}
			<div class="content">{@html description.content}</div>
		{/key}
	</div>

	<!-- circle pack! -->
	<svg {width} {height}>
		<g style={move(margins.top, margins.left)}>
			<!-- looping through to render each circle -->
			{#each descendants as d}
				{#if d.data.children}
					<!-- circles with children should have the bamboo stroke pattern -->
					<circle
						cx={d.x}
						cy={d.y}
						r={d.r}
						class="parent-circle {focus === d.data.src ? 'active' : ''}"
						stroke-dasharray="15 15"
						stroke-linecap="round"
						on:click={handleClick(d.data.src)}
						on:mouseover={() => {
							hoverfocus = d.data.name;
						}}
						on:mouseout={() => {
							hoverfocus = '';
						}}
						on:focus={() => {
							hoverfocus = d.data.name;
						}}
						on:blur={() => {
							hoverfocus = '';
						}}
					/>
				{:else}
					<!-- circles without children should just be a dark circle without a stroke -->
					<circle
						cx={d.x}
						cy={d.y}
						r={d.r}
						class="baby-circle {focus === d.data.src ? 'active' : ''}"
						on:click={handleClick(d.data.src)}
						on:mouseover={() => {
							hoverfocus = d.data.name;
						}}
						on:mouseout={() => {
							hoverfocus = '';
						}}
						on:focus={() => {
							hoverfocus = d.data.name;
						}}
						on:blur={() => {
							hoverfocus = '';
						}}
					/>
				{/if}
			{/each}
		</g>
	</svg>
	<!-- Tooltip that follows the cursor and displays the bubble that the cursor is currently hovering over -->
	<div
		style="position: fixed; left: {m.x + 5}px; top: {m.y + 5}px"
		class={hoverfocus === '' ? 'hidden-tooltip' : ''}
	>
		<Tooltip name={hoverfocus} />
	</div>
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
		outline: none;
	}

	// styles for circles that have children
	.parent-circle {
		fill: rgba(224, 236, 190, 0.5);
		stroke: var(--primary-light);
		stroke-width: 0.5rem;
		&:hover {
			stroke: var(--primary-dark);
		}
		&.active {
			stroke: var(--active);
			fill: var(--active-highlight);
		}
	}

	// styles for circles that do not have children
	.baby-circle {
		fill: #ccdd9f;
		stroke-width: 0;
		&:hover {
			fill: var(--primary-dark);
		}
		&.active {
			fill: var(--active);
		}
	}

	// styles for the scrollable description
	.content {
		background-color: var(--primary-highlighter);
		overflow-y: scroll;
		overflow-wrap: anywhere;
		height: auto;
		margin-right: 1rem;
		padding: 1rem 2rem;
		border-radius: 5px;

		&::-webkit-scrollbar {
			width: 7px;
			background-color: none;
		}

		&::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: var(--primary-subtle);
			height: 50%;
		}
	}

	// wrapper for the heading + content
	.description {
		display: grid;
		grid-template-rows: min-content 1fr;
		height: 75vh;
	}

	svg {
		justify-self: end;
	}

	// when the cursor is out of the circle's bounds, hide the tooltip!
	.hidden-tooltip {
		display: none;
	}

	@media only screen and (max-width: 62rem) {
		// .description {
		// 	display: none !important;
		// }
		.viz-container {
			grid-template-columns: 1fr;
			grid-template-rows: min-content 1fr;
			justify-content: center;
			padding-bottom: 5rem;
		}
		svg {
			justify-self: center;
			grid-row: 1;
		}
		.parent-circle {
			stroke-width: 0.42rem;
		}
		.description {
			padding: 0 1.5rem 0rem 1.5rem;
			height: 100vh;
			.content {
				margin-right: 0;
			}
			h1 {
				text-align: center;
				margin: 0.75rem 0;
				font-size: 2.5rem;
			}
		}
	}
</style>
