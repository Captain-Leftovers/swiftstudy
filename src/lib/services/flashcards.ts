import type { Flashcard } from "$lib/types";

// src/lib/services/flashcards.ts
export async function loadCardsForTopic(topicId: string) {
    const response = await fetch(`/api/topics/${topicId}/cards`);
    
    if (!response.ok) {
      throw new Error('Failed to load flashcards');
    }
     
      

    const flashcards: Flashcard[] = await response.json();
    return flashcards;
  }
  