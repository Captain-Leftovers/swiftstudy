import type { flashcard, topic } from '$lib/server/db/schema';
import type { InferSelectModel } from 'drizzle-orm';

export type Flashcard = InferSelectModel<typeof flashcard>;

export type Topic = InferSelectModel<typeof topic>;

export type FlashcardsStore = { [key: string]: Flashcard[] };
