import { db } from '$lib/server/db/index';
import { topic } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const topics = await db.select().from(topic);
	return {
		topics
	};
};
