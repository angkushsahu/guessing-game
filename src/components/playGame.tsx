import "styles/play.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import { PlayGameProps, StatusType } from "types";
import { checkGuess, updateGuess } from "utils";
import Failed from "./failed";
import Success from "./success";

const PlayGame = (props: PlayGameProps) => {
	const { maxAttempts, randomNumber } = props;

	const [attempts, setAttempts] = useState<string[]>([]);
	const [guess, setGuess] = useState(0);
	const [status, setStatus] = useState<StatusType>("playing");

	const guessRef = useRef<HTMLInputElement>(null);

	const checkGuessWrapper = (e: FormEvent) => {
		const args = { e, attempts: attempts.length, guess, maxAttempts, randomNumber, setAttempts, setGuess, setStatus, status };
		checkGuess(args);
	};

	const focusOnInput = () => {
		guessRef.current?.focus();
	};

	useEffect(() => {
		focusOnInput();
	}, []);

	return (
		<>
			{status === "playing" ? (
				<section className="play-game">
					<form onSubmit={checkGuessWrapper}>
						<div className="input-container" onClick={focusOnInput}>
							<label htmlFor="guess">Enter your guess</label>
							<input
								type="text"
								name="guess"
								id="guess"
								placeholder="Enter your guess ...."
								value={guess}
								onChange={(e) => updateGuess(e, setGuess)}
								ref={guessRef}
							/>
						</div>
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
				<Failed />
			)}
		</>
	);
};

export default PlayGame;
