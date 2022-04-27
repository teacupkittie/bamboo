<script>
	import { fly } from 'svelte/transition';
	export let refresh = '';
</script>

{#key refresh}
	<div in:fly={{ y: 100, duration: 600, delay: 600 }} out:fly={{ y: -100, duration: 600 }}>
		<slot />
	</div>
{/key}
