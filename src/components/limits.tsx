import "styles/limits.css";
import { useRef } from "react";
import { FormEvent, useState } from "react";
import { LimitProps } from "types";
import { setLimits, updateLowerLimit, updateUpperLimit } from "utils";

const Limits = (props: LimitProps) => {
	const { setAreLimitsSet, setRandomNumber, setMaxAttempts } = props;

	const [incorrectLimits, setIncorrectLimits] = useState(false);
	const [lowerLimit, setLowerLimit] = useState(0);
	const [upperLimit, setUpperLimit] = useState(0);

	const lowerLimitRef = useRef<HTMLInputElement>(null);
	const upperLimitRef = useRef<HTMLInputElement>(null);

	const setLimitWrapper = (e: FormEvent) => {
		const args = { e, upperLimit, lowerLimit, setIncorrectLimits, setAreLimitsSet, setRandomNumber, setMaxAttempts };
		setLimits(args);
	};

	return (
		<div className="limits-fieldset">
			<h2 className="limits-fieldset--heading">Choose a range</h2>
			<form onSubmit={setLimitWrapper} className="limits-fieldset--form">
				<div>
					<div className="input-container" onClick={() => lowerLimitRef.current?.focus()}>
						<label htmlFor="lowerLimit">Choose Lower Limit</label>
						<input
							type="text"
							name="lowerLimit"
							id="lowerLimit"
							placeholder="Choose Lower Limit"
							value={lowerLimit}
							onChange={(e) => updateLowerLimit(e, setLowerLimit)}
							ref={lowerLimitRef}
						/>
					</div>
					<div className="input-container" onClick={() => upperLimitRef.current?.focus()}>
						<label htmlFor="upperLimit">Choose Upper Limit</label>
						<input
							type="text"
							name="upperLimit"
							id="upperLimit"
							placeholder="Choose Upper Limit"
							value={upperLimit}
							onChange={(e) => updateUpperLimit(e, setUpperLimit)}
							ref={upperLimitRef}
						/>
					</div>
				</div>
				{incorrectLimits ? (
					<p className="limits-fieldset--error error">Difference between upper limit and lower limit should be more than 100</p>
				) : null}
				<button type="submit" className="limits-fieldset--button">
					Set Limits
				</button>
			</form>
		</div>
	);
};

export default Limits;
