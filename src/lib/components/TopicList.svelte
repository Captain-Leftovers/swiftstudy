<script lang="ts">
	import { flip } from 'svelte/animate';
	import { receive, send } from '$lib/animations/transition';
	import type { Topic } from '$lib/types';
	import TopicCard from './TopicCard.svelte';

	export let topics: Topic[] = [];
	export let pickedTopic: Topic | undefined;
	export let isPicked: boolean = false;
</script>

<ul class=" mx-auto flex h-fit w-fit sm:flex-col gap-4">
	{#each topics.filter((x) => {
		if (isPicked && pickedTopic) {
			return x.id === pickedTopic.id;
		}
		if (!isPicked) {
			return x.id !== pickedTopic?.id;
		}
	}) as topic, i (topic.id)}
		<div
			in:receive={{ key: topic.id }}
			out:send={{ key: topic.id }}
			animate:flip={{ duration: 200 }}
		>
			<li class="">
				<TopicCard on:flashcards {topic} index={i} />
			</li>
		</div>
	{/each}
</ul>
