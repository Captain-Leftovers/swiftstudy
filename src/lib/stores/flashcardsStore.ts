import { writable } from 'svelte/store';
import type { Flashcard } from '$lib/types';



export const flashcardsStore = writable<{ [key: string]: Flashcard[] }>({});


export function cacheFlashcards(topicId: string, flashcards: Flashcard[]) {
	flashcardsStore.update((store) => {
		
		store[topicId] = flashcards;
		return store;
	});
}
