<script lang="ts">
	import TopicCard from '$lib/components/TopicCard.svelte';
	import type { Flashcard, Topic } from '$lib/types';
	import type { PageData } from './$types';
	import { send, receive } from '$lib/animations/transition';
	import QuestionCard from '$lib/components/QuestionCard.svelte';
	import TodoList from '$lib/components/TopicList.svelte';
	import TopicList from '$lib/components/TopicList.svelte';

	export let data: PageData;
	let topics = data.topics;
	let pickedTopic: Topic | undefined;
	let questions: Flashcard[] = [];

	function handleFlashcardsEvent(event: CustomEvent) {
		if (pickedTopic === topics.find((topic) => topic.id === event.detail[0].topicId)) {
			pickedTopic = undefined;
			questions = [];
			return;
		}
		pickedTopic = topics.find((topic) => topic.id === event.detail[0].topicId);

		questions = event.detail;

		if (pickedTopic != undefined) {
			return;
		}
	}
</script>

<section class="flex flex-col gap-8">
	<div class="h-1 min-h-10 items-center text-center">
		<TopicList {topics} {pickedTopic} isPicked on:flashcards={handleFlashcardsEvent} />
		{#if !pickedTopic}
			<h1 class="animate-fadeIn text-4xl">Pick a Topic</h1>
		{/if}
	</div>
	<div class="flex gap-8">
		<div class="flex w-max min-w-48 gap-2 transition-all lg:flex-col">
			<TopicList {topics} {pickedTopic} on:flashcards={handleFlashcardsEvent} />
		</div>
		<section class="grow items-center justify-center">
			<QuestionCard {questions} />
		</section>
	</div>
</section>
