<script>
	const { children } = $props();
</script>

<div class="absolute w-full h-full bg-stone-950"></div>

<div
	class="
    absolute w-full h-full
    bg-[radial-gradient(rgb(68,64,60)_1px,_transparent_0)] bg-[length:25px_25px]
"
></div>

{@render children()}
