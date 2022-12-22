import { Dispatch, FormEvent, SetStateAction } from "react";

export type StatusType = "playing" | "failed" | "success";

export type SetLimitArgs = {
	e: FormEvent;
	upperLimit: number;
	lowerLimit: number;
	setIncorrectLimits: Dispatch<SetStateAction<boolean>>;
	setAreLimitsSet: Dispatch<SetStateAction<boolean>>;
	setRandomNumber: Dispatch<SetStateAction<number>>;
	setMaxAttempts: Dispatch<SetStateAction<number>>;
};

export type CheckGuessArgs = {
	e: FormEvent;
	attempts: number;
	maxAttempts: number;
	status: StatusType;
	randomNumber: number;
	guess: number;
	setAttempts: Dispatch<React.SetStateAction<string[]>>;
	setStatus: Dispatch<React.SetStateAction<StatusType>>;
	setGuess: Dispatch<React.SetStateAction<number>>;
};

export type LimitProps = {
	setAreLimitsSet: Dispatch<SetStateAction<boolean>>;
	setRandomNumber: Dispatch<SetStateAction<number>>;
	setMaxAttempts: Dispatch<SetStateAction<number>>;
};

export type PlayGameProps = {
	maxAttempts: number;
	randomNumber: number;
};
