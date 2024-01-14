import type { CheckGuessArgs, SetLimitArgs } from "./types";

export function getRandomNumber(low: number, high: number) {
	const randomNumber = Math.floor(low + Math.random() * (high - low + 1));
	return randomNumber ? randomNumber : 1;
}

export function setLimits(args: SetLimitArgs) {
	const { lowerLimit, setAreLimitsSet, setMaxAttempts, setRandomNumber, upperLimit } = args;
	setRandomNumber(getRandomNumber(lowerLimit, upperLimit));
	setMaxAttempts(Math.ceil(Math.log2(upperLimit - lowerLimit)));
	setAreLimitsSet(true);
}

export function checkGuess(args: CheckGuessArgs) {
	const { attempts, maxAttempts, status, randomNumber, guess, setAttempts, setStatus } = args;

	if (attempts === maxAttempts - 1) {
		setStatus(randomNumber === guess ? "success" : "failed");
		return;
	}
	if (status === "success" || status === "failed") return;

	let guessedNumber = Number(guess);

	if (guessedNumber < randomNumber) setAttempts((prev) => [...prev, `${guess} : Enter a larger value`]);
	else if (guessedNumber > randomNumber) setAttempts((prev) => [...prev, `${guess} : Enter a smaller value`]);
	else {
		setAttempts((prev) => [...prev, `Hurrah 🥳, you cracked it in ${attempts + 1} ${attempts === 1 ? "attempt" : "attempts"}`]);
		setStatus("success");
	}
}
