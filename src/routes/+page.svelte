<script lang="ts">
	import TopicCard from '$lib/components/TopicCard.svelte';
	import type { Flashcard, Topic } from '$lib/types';
	import type { PageData } from './$types';
	import { send, receive } from '$lib/animations/transition';
	import QuestionCard from '$lib/components/QuestionCard.svelte';

	export let data: PageData;
	let topics = data.topics;
	let pickedTopic: Topic | undefined;
	let questions: Flashcard[] = [];

	function handleFlashcardsEvent(event: CustomEvent) {
		pickedTopic = topics.find((topic) => topic.id === event.detail[0].topicId);

		questions = event.detail;

		if (pickedTopic != undefined) {
			return;
		}
	}
</script>

<section class="flex flex-col gap-8">
	<div class="h-1 min-h-10 items-center text-center">
		{#if pickedTopic}
			<div
				in:receive={{ key: pickedTopic.id }}
				out:send={{ key: pickedTopic.id }}
				class=" mx-auto h-fit w-fit"
			>
				<TopicCard isPicked topic={pickedTopic} />
			</div>
		{:else}
			<h1 class="text-4xl animate-fadeIn">Pick a Topic</h1>
		{/if}
	</div>
	<div class="flex gap-8">
		<div class="flex w-max min-w-48 lg:flex-col gap-2 transition-all">
			{#each topics as topic, i (topic.id)}
				{#if pickedTopic?.id != topic.id}
					<div class="h-fit w-fit" in:receive={{ key: topic.id }} out:send={{ key: topic.id }}>
						<TopicCard on:flashcards={handleFlashcardsEvent} addClass="" {topic} index={i} />
					</div>
				{/if}
			{/each}
		</div>
		<section class="grow items-center justify-center">
			<QuestionCard {questions} />
		</section>
	</div>
</section>
