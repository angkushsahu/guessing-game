import { FormEvent, useState } from "react";
import { PlayGameProps, StatusType } from "types";
import { checkGuess, updateGuess } from "utils";
import Failed from "./failed";
import Success from "./success";

const PlayGame = (props: PlayGameProps) => {
	const { maxAttempts, randomNumber } = props;

	const [attempts, setAttempts] = useState<string[]>([]);
	const [guess, setGuess] = useState(0);
	const [status, setStatus] = useState<StatusType>("playing");

	const checkGuessWrapper = (e: FormEvent) => {
		const args = { e, attempts: attempts.length, guess, maxAttempts, randomNumber, setAttempts, setGuess, setStatus, status };
		checkGuess(args);
	};

	return (
		<>
			{status === "playing" ? (
				<>
					{attempts.map((attempt, idx) => (
						<p key={idx} className={status ? "" : "error"}>
							{attempt}
						</p>
					))}
					<form onSubmit={checkGuessWrapper}>
						<label htmlFor="guess"></label>
						<input
							type="text"
							name="guess"
							id="guess"
							placeholder="Enter your guess ...."
							value={guess}
							onChange={(e) => updateGuess(e, setGuess)}
						/>
						<button type="submit">Check</button>
					</form>
					<h2>Attempts : {attempts.length}</h2>
					<h2>Max Attempts : {maxAttempts}</h2>
				</>
			) : status === "success" ? (
				<Success />
			) : (
				<Failed />
			)}
		</>
	);
};

export default PlayGame;
