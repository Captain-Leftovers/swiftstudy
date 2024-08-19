import { sqliteTable, text, numeric } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

import { relations } from 'drizzle-orm/relations';

export const flashcard = sqliteTable('Flashcard', {
	id: text('id').primaryKey().notNull(),
	question: text('question').notNull(),
	answer: text('answer').notNull(),
	createdAt: numeric('createdAt')
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull(),
	topicId: text('topicId')
		.notNull()
		.references(() => topic.id, { onDelete: 'restrict', onUpdate: 'cascade' })
});

export const topic = sqliteTable('Topic', {
	id: text('id').primaryKey().notNull(),
	name: text('name').notNull()
});
export const flashcardRelations = relations(flashcard, ({ one }) => ({
	topic: one(topic, {
		fields: [flashcard.topicId],
		references: [topic.id]
	})
}));

export const topicRelations = relations(topic, ({ many }) => ({
	flashcards: many(flashcard)
}));
