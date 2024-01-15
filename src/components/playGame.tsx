import "styles/play.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

import type { StatusType } from "types";
import { checkGuess } from "utils";
import Success from "./success";
import Failed from "./failed";

export interface PlayGameProps {
	maxAttempts: number;
	randomNumber: number;
}

const playGameSchema = z.object({
	guess: z.coerce.number().min(1, { message: "Guess a number" }),
});

export type PlayGameType = z.infer<typeof playGameSchema>;

export default function PlayGame({ maxAttempts, randomNumber }: PlayGameProps) {
	const [attempts, setAttempts] = useState<Array<string>>([]);
	const [status, setStatus] = useState<StatusType>("playing");

	const playGameForm = useForm<PlayGameType>({ resolver: zodResolver(playGameSchema) });

	function checkGuessWrapper(values: PlayGameType) {
		const args = { attempts: attempts.length, ...values, maxAttempts, randomNumber, setAttempts, setStatus, status };
		checkGuess(args);
		playGameForm.reset();
	}

	function focusOnInput() {
		playGameForm.setFocus("guess");
	}

	return (
		<>
			{status === "playing" ? (
				<section className="play-game">
					<form onSubmit={playGameForm.handleSubmit(checkGuessWrapper)}>
						<div className="input-container" onClick={focusOnInput}>
							<label htmlFor="guess">Enter your guess</label>
							<input id="guess" type="text" placeholder="Enter your guess ...." {...playGameForm.register("guess")} autoFocus />
						</div>
						{playGameForm.formState.errors.guess ? (
							<p className="limits-fieldset--error error">{playGameForm.formState.errors.guess.message}</p>
						) : null}
						<button type="submit">Check</button>
						<h3>Attempts : {attempts.length}</h3>
						<h3 className="text-green">Max Attempts : {maxAttempts}</h3>
					</form>
					<div className="attempts-board">
						<h2 className="attempts-board--heading">Attempts 👇🏻</h2>
						{attempts.map((attempt, idx) => (
							<div key={idx} className="attempts">
								<p>
									<span className="strong">Your guess : </span>
									<span className="lighten">{attempt.split(":")[0]}</span>
								</p>
								<p>
									💡 : <span className="lighten">{attempt.split(":")[1]}</span>
								</p>
							</div>
						))}
					</div>
				</section>
			) : status === "success" ? (
				<Success />
			) : (
				<Failed randomNumber={randomNumber} />
			)}
		</>
	);
}
