<script lang="ts">
	import type { Flashcard, Topic } from '$lib/types';
	import { flashcardsStore, cacheFlashcards } from '$lib/stores/flashcardsStore';
	import { createEventDispatcher } from 'svelte';
	import { loadCardsForTopic } from '$lib/services/flashcards';
	import { onDestroy } from 'svelte';

	const dispatch = createEventDispatcher();
	export let topic: Topic;
	export let addClass: string = '';
	export let index: number = 0;
	export let isPicked:boolean = false
	let unsubscribe: () => void;

	const colors = ['bg-red-400', 'bg-teal-400', 'bg-green-500', 'bg-yellow-400', 'bg-purple-500'];

	function getConsecutiveColor(index: number) {
		if (isPicked) {
			return "bg-yellow-400"
		}
		return colors[index % colors.length];
	}
	let cachedData: Flashcard[] = [];

	unsubscribe = flashcardsStore.subscribe((data) => {
		cachedData = data[topic.id];
	});
	async function handleTopicClick() {
		if (cachedData != undefined && cachedData.length > 0) {
			dispatch('flashcards', cachedData);
		} else {
			try {
				const flashcards = await loadCardsForTopic(topic.id);

				if (flashcards.length > 0) {
					cacheFlashcards(topic.id, flashcards);
					dispatch('flashcards', flashcards);
				} else {
					console.error('No flashcards found for this topic');
				}
			} catch (error) {
				console.error(error);
			}
		}
	}

	onDestroy(() => unsubscribe());
</script>

<section>
	<button
		on:click={handleTopicClick}
		class="{getConsecutiveColor(index)} w-fit rounded-lg p-2 transition-all hover:scale-105"
	>
		<div class=" {addClass} ">
			<h2 class="text-2xl">{topic.name}</h2>
		</div>
	</button>
</section>
