import { useState } from "react";
import { Limits, PlayGame } from "components";

const App = () => {
	const [areLimitsSet, setAreLimitsSet] = useState(false);
	const [maxAttempts, setMaxAttempts] = useState(0);
	const [randomNumber, setRandomNumber] = useState(0);

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
};

export default App;
