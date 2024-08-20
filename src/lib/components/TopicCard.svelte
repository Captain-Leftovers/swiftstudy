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
	export let isPicked: boolean = false;
	let unsubscribe: () => void;


	function getConsecutiveColor() {
		if (topic.id === '1') {
			return 'bg-yellow-400';
		} else if (topic.id === '2') {
			return 'bg-blue-400';
		} else if (topic.id === '3') {
			return 'bg-red-400';
		} else if (topic.id === '4') {
			return 'bg-teal-400';
		} else if (topic.id === '5') {
			return 'bg-purple-400';
		} else {
			return 'bg-green-400';
		}
		
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
		class="{getConsecutiveColor()} w-fit rounded-lg p-2 transition-all hover:scale-105"
	>
		<div class=" {addClass} ">
			<h2 class="text-lg sm:text-2xl">{topic.name}</h2>
		</div>
	</button>
</section>
