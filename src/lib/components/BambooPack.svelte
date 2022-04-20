<script>
	import { pack, hierarchy } from 'd3-hierarchy';
	// import * as d3 from 'd3';
	export let data;

	const move = (x, y) => `transform: translate(${x}px, ${y}px`;

	export let margins = {
		// typical d3 margin convention
		top: 20,
		right: 20,
		bottom: 20,
		left: 20
	};

	export let width;
	// export let labelVisibilityThreshold = (r) => r > 25;

	$: height = width;
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
	// let focus = root;
	// let view;
</script>

<!-- <div class="circle-pack">
	{#each descendants as d}
		<div class="circle-group" data-id={d.data.name} data-visible={labelVisibilityThreshold(d.r)}>
			<div
				class="circle"
				style="
                left: {d.x}px;
                top: {d.y}px;
                width: {d.r * 2}px;
                height: {d.r * 2}px;
                background-color: var(--primary-highlight);
                border: 1.5rem dashed var(--primary);
                border-radius: 50%;"
			/>
			<div class="text-group">
				<div class="text">{d.data.name}</div>
				{#if d.data.value}
					<div class="text value">{d.data.value}</div>
				{/if}
			</div>
		</div>
	{/each}
</div> -->

<div>
	<svg {width} {height}>
		<g style={move(margins.top, margins.left)}>
			{#each descendants as d}
				{#if d.data.children}
					<circle
						cx={d.x}
						cy={d.y}
						r={d.r}
						style="
                            fill: var(--primary-highlight); 
                            stroke: var(--primary); 
                            stroke-width: 0.5rem;"
						stroke-dasharray="15 15"
						stroke-linecap="round"
					/>
				{:else}
					<circle
						cx={d.x}
						cy={d.y}
						r={d.r}
						style="
                            fill: var(--primary);
                            stroke-width: 0;"
					/>
				{/if}
			{/each}
		</g>
	</svg>
</div>

<style>
	div {
		overflow: hidden;
	}
</style>
