<script lang="ts">
	import type { Flashcard } from '$lib/types';
	import { icons } from '$lib/assets/svg-pack';

	let isFlipped = false;
	let qIndex: number = 0;
	export let questions: Flashcard[];
	let turning: boolean = false;
	function flipCard() {
		isFlipped = !isFlipped;
	}

	function nextQuestion() {
		if (questions.length < 1) {
			return;
		}
		turning = true;
		flipCard();
		setTimeout(() => {
			qIndex += 1;
			if (questions.length - 1 < qIndex) {
				qIndex = 0;
			}
			turning = false;
		}, 600);
	}
</script>

{#if questions.length > 0}
	<section
		class="absolute {isFlipped
			? 'left-[calc(50%-7.5rem)]'
			: 'left-[50%]'} top-[55%] flex -translate-x-1/2 -translate-y-[38%] items-start transition-all sm:left-[50%] sm:-translate-y-1/2"
	>
		<section class="card-section">
			<div class="card {isFlipped ? 'rotate-card' : ''}">
				<div class="flip-card">
					<div class="flip-card__container">
						<div class="card-front">
							<div class="card-front__tp card-front__tp--city">
								{#if !turning}
									<p class="card-front__text-price animate-fadeIn">{questions[qIndex].question}</p>
								{/if}
							</div>

							<div class="card-front__bt">
								<button
									on:click={flipCard}
									class="card-front__text-view card-front__text-view--city transition-all hover:scale-105"
									>View Answer</button
								>
							</div>
						</div>
						<div class="card-back relative flex items-center justify-center">
							<video class="video__container" autoplay muted loop>
								<source
									class="video__media"
									src="https://player.vimeo.com/external/370331493.sd.mp4?s=e90dcaba73c19e0e36f03406b47bbd6992dd6c1c&profile_id=139&oauth2_token_id=57447761"
									type="video/mp4"
								/>
							</video>
							<div class=" absolute">
								{@html icons[0]}
							</div>
						</div>
					</div>
				</div>

				<div class="inside-page">
					<div class="inside-page__container flex">
						<p class="inside-page__text grow">
							{questions[qIndex].answer}
						</p>
						<button on:click={nextQuestion} class="inside-page__btn inside-page__btn--city"
							>Next Question</button
						>
					</div>
				</div>
			</div>
		</section>
	</section>
{:else}
	<section
		class="absolute {isFlipped
			? 'left-[calc(50%-7.5rem)]'
			: 'left-[50%]'} top-[55%] flex -translate-x-1/2 -translate-y-[38%] items-start transition-all sm:left-[50%] sm:-translate-y-1/2"
	>
		<section class="card-section">
			<div class="card {isFlipped ? 'rotate-card' : ''}">
				<div class="flip-card">
					<div class="flip-card__container">
						<div class="card-front">
							<div class="card-front__tp card-front__tp--city">
								{#if !turning}
									<p class="card-front__text-price animate-fadeIn">Pick a Topic</p>
								{/if}
							</div>

							<div class="card-front__bt">
								<button
									disabled={questions.length === 0}
									on:click={flipCard}
									class="card-front__text-view card-front__text-view--city transition-all hover:scale-105"
									>{questions.length === 0 ? "To Start" : "View Answer" }</button
								>
							</div>
						</div>
						<div class="card-back relative flex items-center justify-center">
							<video class="video__container" autoplay muted loop>
								<source
									class="video__media"
									src="https://player.vimeo.com/external/370331493.sd.mp4?s=e90dcaba73c19e0e36f03406b47bbd6992dd6c1c&profile_id=139&oauth2_token_id=57447761"
									type="video/mp4"
								/>
							</video>
							<div class=" absolute">
								{@html icons[0]}
							</div>
						</div>
					</div>
				</div>

				<div class="inside-page">
					<div class="inside-page__container flex">
						<p class="inside-page__text grow">nothing</p>
						<button
							disabled={questions.length === 0}
							on:click={nextQuestion}
							class="inside-page__btn inside-page__btn--city">Next Question</button
						>
					</div>
				</div>
			</div>
		</section>
	</section>
{/if}

<style>
	.card-front__tp {
		color: #fafbfa;
	}

	.card-front__text-price {
		font-size: 1.2rem;
		margin-top: -0.2rem;
	}

	.inside-page__text {
		color: #333;
	}

	.inside-page__btn {
		background-color: transparent;
		border: 3px solid;
		border-radius: 0.5rem;
		font-size: 1.2rem;
		font-weight: 600;
		margin-top: 2rem;
		overflow: hidden;
		padding: 0.7rem 0.75rem;
		position: relative;
		text-decoration: none;
		transition: all 0.3s ease;
		width: 90%;
		z-index: 10;
	}

	.inside-page__btn::before {
		content: '';
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		transform: scaleY(0);
		transition: all 0.3s ease;
		width: 100%;
		z-index: -1;
	}

	.inside-page__btn--city {
		border-color: #8f4068;
		color: #ff40a1;
	}

	.inside-page__btn--city::before {
		background-color: #ff40a1;
	}

	.inside-page__btn:hover {
		color: #fafbfa;
	}

	.inside-page__btn:hover::before {
		transform: scaleY(1);
	}

	.card-section {
		align-items: center;
		display: flex;
		height: 100%;
		justify-content: center;
		width: 100%;
	}

	.card {
		background-color: rgba(0, 0, 0, 0.05);
		box-shadow: -0.1rem 1.7rem 6.6rem -3.2rem rgba(0, 0, 0, 0.5);
		height: 20rem;
		position: relative;
		transition: all 1s ease;
		width: 15rem;
	}

	.flip-card {
		height: 20rem;
		perspective: 100rem;
		position: absolute;
		right: 0;
		transition: all 1s ease;
		visibility: hidden;
		width: 15rem;
		z-index: 100;
	}

	.flip-card > * {
		visibility: visible;
	}

	.flip-card__container {
		height: 100%;
		position: absolute;
		right: 0;
		transform-origin: left;
		transform-style: preserve-3d;
		transition: all 1s ease;
		width: 100%;
	}

	.card-front,
	.card-back {
		backface-visibility: hidden;
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
	}

	.card-front {
		background-color: #fafbfa;
		height: 20rem;
		width: 15rem;
	}

	.card-front__tp {
		align-items: center;
		clip-path: polygon(0 0, 100% 0, 100% 90%, 57% 90%, 50% 100%, 43% 90%, 0 90%);
		display: flex;
		flex-direction: column;
		height: 17rem;
		justify-content: center;
		padding: 0.75rem;
	}

	.card-front__tp--city {
		background: linear-gradient(to bottom, #ff73b9, #ff40a1);
	}

	.card-front__bt {
		align-items: center;
		display: flex;
		justify-content: center;
	}

	.card-back {
		background-color: #fafbfa;
		transform: rotateY(180deg);
	}

	.video__container {
		clip-path: polygon(0% 0%, 100% 0%, 90% 50%, 100% 100%, 0% 100%);
		height: auto;
		min-height: 100%;
		object-fit: cover;
		width: 100%;
	}

	.inside-page {
		background-color: #fafbfa;
		box-shadow: inset 20rem 0px 5rem -2.5rem rgba(0, 0, 0, 0.25);
		height: 100%;
		padding: 1rem;
		position: absolute;
		right: 0;
		transition: all 1s ease;
		width: 15rem;
		z-index: 1;
	}

	.inside-page__container {
		align-items: center;
		display: flex;
		flex-direction: column;
		height: 100%;
		text-align: center;
		width: 100%;
	}

	.rotate-card {
		box-shadow: -0.1rem 1.7rem 6.6rem -3.2rem rgba(0, 0, 0, 0.75);
		width: 30rem;
	}

	.rotate-card .flip-card__container {
		transform: rotateY(-180deg);
	}

	.rotate-card .inside-page {
		box-shadow: inset 1rem 0px 5rem -2.5rem rgba(0, 0, 0, 0.1);
	}
</style>
