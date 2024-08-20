<script>
	import '../app.css';

	let date = new Date()
		.toLocaleDateString('en-US', { month: 'short', day: '2-digit', weekday: 'short' })
		.split(',');
	let verticalText = 'BeeOnDWeb';
</script>

<header class="pb-10">
	<nav class="flex items-center gap-8 px-4 py-2">
		<div class="text-2xl font-semibold">
			<a href="/">SwiftStudy</a>
		</div>
	</nav>
</header>
<main class="flex grow flex-col rounded-xl bg-zinc-300 p-4 pb-2 pt-8 sm:py-10">
	<slot></slot>
	<section class="relative mt-auto flex font-mono font-normal tracking-widest">
		<div class=" flex flex-col justify-end">
			<p class="">{date[1]}</p>
			<p class="">{date[0]}</p>
		</div>
		<div class="absolute bottom-2 right-0 ml-auto">
			<p class="vertical-rl">{verticalText}</p>
		</div>
	</section>
</main>
<footer class="mx-auto px-4 py-2">
	<p>&copy; {new Date().getFullYear()} SwiftStudy</p>
</footer>

<style>
	.vertical-rl {
		writing-mode: vertical-lr;
		transform: rotate(180deg);
	}
</style>
