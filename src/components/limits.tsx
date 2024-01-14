import "styles/limits.css";

import type { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { setLimits } from "utils";

export interface LimitProps {
	setAreLimitsSet: Dispatch<SetStateAction<boolean>>;
	setRandomNumber: Dispatch<SetStateAction<number>>;
	setMaxAttempts: Dispatch<SetStateAction<number>>;
}

const limitsSchema = z
	.object({
		lowerLimit: z.coerce.number().min(1, { message: "Minimum value: 1" }),
		upperLimit: z.coerce.number().min(1, { message: "Difference between upper limit and lower limit should be more than 99" }),
	})
	.refine((data) => data.upperLimit - data.lowerLimit >= 99, {
		path: ["upperLimit"],
		message: "Difference between upper limit and lower limit should be more than 99",
	});

export type LimitsType = z.infer<typeof limitsSchema>;

export default function Limits({ setAreLimitsSet, setMaxAttempts, setRandomNumber }: LimitProps) {
	const limitsForm = useForm<LimitsType>({ resolver: zodResolver(limitsSchema) });

	function setLimitWrapper(values: LimitsType) {
		const args = { ...values, setAreLimitsSet, setRandomNumber, setMaxAttempts };
		setLimits(args);
	}

	return (
		<div className="limits-fieldset">
			<h2 className="limits-fieldset--heading">Choose a range</h2>
			<form onSubmit={limitsForm.handleSubmit(setLimitWrapper)} className="limits-fieldset--form">
				<div>
					<div className="input-container" onClick={() => limitsForm.setFocus("lowerLimit")}>
						<label htmlFor="lowerLimit">Choose Lower Limit</label>
						<input type="text" id="lowerLimit" placeholder="Choose Lower Limit" {...limitsForm.register("lowerLimit")} />
					</div>
					{limitsForm.formState.errors.lowerLimit ? (
						<p className="limits-fieldset--error error">{limitsForm.formState.errors.lowerLimit.message}</p>
					) : null}
					<div className="input-container margin-top" onClick={() => limitsForm.setFocus("upperLimit")}>
						<label htmlFor="upperLimit">Choose Upper Limit</label>
						<input type="text" id="upperLimit" placeholder="Choose Upper Limit" {...limitsForm.register("upperLimit")} />
					</div>
					{limitsForm.formState.errors.upperLimit ? (
						<p className="limits-fieldset--error error">{limitsForm.formState.errors.upperLimit.message}</p>
					) : null}
				</div>
				<button type="submit" className="limits-fieldset--button">
					Set Limits
				</button>
			</form>
		</div>
	);
}
