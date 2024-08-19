import { eq } from 'drizzle-orm';
import { flashcard } from './schema';
import { db } from '.';

export function getFlashcardsByTopicId(topicId: string) {
	let res = db.select().from(flashcard).where(eq(flashcard.topicId, topicId));
	return res;
}
