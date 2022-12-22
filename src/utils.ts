import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { CheckGuessArgs, SetLimitArgs } from "./types";

export const getRandomNumber = (low: number, high: number) => {
	const randomNumber = Math.floor(low + Math.random() * (high - low + 1));
	return randomNumber ? randomNumber : 1;
};

export const isNumber = (value: string) => {
	const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	let condition = false;

	for (let number in numbers) {
		if (number === value) {
			condition = true;
		}
	}

	return condition;
};

export const updateLowerLimit = (e: ChangeEvent<HTMLInputElement>, setLowerLimit: Dispatch<SetStateAction<number>>) => {
	const { value } = e.target;
	if (!value.length) {
		setLowerLimit(0);
		return;
	}
	if (!isNumber(value.substring(value.length - 1))) {
		return;
	}

	setLowerLimit(Number(value));
};

export const updateUpperLimit = (e: ChangeEvent<HTMLInputElement>, setUpperLimit: Dispatch<SetStateAction<number>>) => {
	const { value } = e.target;
	if (!value.length) {
		setUpperLimit(0);
		return;
	}
	if (!isNumber(value.substring(value.length - 1))) {
		return;
	}

	setUpperLimit(Number(value));
};

export const updateGuess = (e: ChangeEvent<HTMLInputElement>, setGuess: Dispatch<SetStateAction<number>>) => {
	const { value } = e.target;
	if (!value.length) {
		setGuess(0);
		return;
	}
	if (!isNumber(value.substring(value.length - 1))) {
		return;
	}

	setGuess(Number(value));
};

export const setLimits = (args: SetLimitArgs) => {
	const { upperLimit, lowerLimit, setIncorrectLimits, setAreLimitsSet, setRandomNumber, setMaxAttempts } = args;

	if (upperLimit - lowerLimit < 100) {
		setIncorrectLimits(true);
		setAreLimitsSet(false);
		return;
	}

	setIncorrectLimits(false);
	setAreLimitsSet(true);
	setRandomNumber(getRandomNumber(lowerLimit, upperLimit));
	setMaxAttempts(Math.ceil(Math.log2(upperLimit - lowerLimit)));
};

export const checkGuess = (args: CheckGuessArgs) => {
	const { e, attempts, maxAttempts, status, randomNumber, guess, setAttempts, setStatus, setGuess } = args;

	e.preventDefault();
	console.log(`Status: ${status}, Attempts: ${attempts}, Max Attempts: ${maxAttempts}, Random Number: ${randomNumber}`);

	if (attempts === maxAttempts - 1) {
		setStatus(randomNumber === guess ? "success" : "failed");
		return;
	}
	if (status === "success" || status === "failed") {
		return;
	}
	let guessedNumber = Number(guess);

	if (guessedNumber < randomNumber) {
		setAttempts((prev) => [...prev, `${guess} : Enter a larger value`]);
	} else if (guessedNumber > randomNumber) {
		setAttempts((prev) => [...prev, `${guess} : Enter a smaller value`]);
	} else {
		setAttempts((prev) => [...prev, `Hurrah 🥳, you cracked it in ${attempts + 1} ${attempts === 1 ? "attempt" : "attempts"}`]);
		setStatus("success");
	}

	setGuess(0);
};
