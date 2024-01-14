import type { Dispatch, SetStateAction } from "react";

export type StatusType = "playing" | "failed" | "success";

export interface SetLimitArgs {
	upperLimit: number;
	lowerLimit: number;
	setMaxAttempts: Dispatch<SetStateAction<number>>;
	setRandomNumber: Dispatch<SetStateAction<number>>;
	setAreLimitsSet: Dispatch<SetStateAction<boolean>>;
}

export interface CheckGuessArgs {
	attempts: number;
	maxAttempts: number;
	status: StatusType;
	randomNumber: number;
	guess: number;
	setAttempts: Dispatch<React.SetStateAction<Array<string>>>;
	setStatus: Dispatch<React.SetStateAction<StatusType>>;
}
