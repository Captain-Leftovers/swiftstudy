
import type { RequestHandler } from '@sveltejs/kit';
import { flashcard } from '$lib/server/db/schema';
import {  type InferSelectModel } from 'drizzle-orm';
import { getFlashcardsByTopicId } from '$lib/server/db/queries';

type Card = InferSelectModel<typeof flashcard>;

export const GET: RequestHandler<Card> = async (request) => {
    const { topicId } = request.params;
    const cards = await getFlashcardsByTopicId(topicId);

    

    return new Response(JSON.stringify(cards))

}
