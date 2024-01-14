import { Limits, PlayGame } from "components";
import { useState } from "react";

export default function App() {
	const [areLimitsSet, setAreLimitsSet] = useState(false);
	const [randomNumber, setRandomNumber] = useState(0);
	const [maxAttempts, setMaxAttempts] = useState(0);

	return (
		<main className="root">
			<h1 className="root-heading">Guess The Number</h1>
			{!areLimitsSet ? (
				<Limits setAreLimitsSet={setAreLimitsSet} setMaxAttempts={setMaxAttempts} setRandomNumber={setRandomNumber} />
			) : (
				<PlayGame maxAttempts={maxAttempts} randomNumber={randomNumber} />
			)}
		</main>
	);
}
