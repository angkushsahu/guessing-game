import { useState } from "react";
import { LimitProps } from "types";
import { setLimits, updateLowerLimit, updateUpperLimit } from "utils";

const Limits = (props: LimitProps) => {
	const { setAreLimitsSet, setRandomNumber, setMaxAttempts } = props;

	const [incorrectLimits, setIncorrectLimits] = useState(false);
	const [lowerLimit, setLowerLimit] = useState(0);
	const [upperLimit, setUpperLimit] = useState(0);

	const setLimitWrapper = () => {
		const args = { upperLimit, lowerLimit, setIncorrectLimits, setAreLimitsSet, setRandomNumber, setMaxAttempts };
		setLimits(args);
	};

	return (
		<fieldset>
			<h2>Choose a range</h2>
			<div>
				<div>
					<label htmlFor="lowerLimit"></label>
					<input
						type="text"
						name="lowerLimit"
						id="lowerLimit"
						placeholder="Choose Lower Limit"
						value={lowerLimit}
						onChange={(e) => updateLowerLimit(e, setLowerLimit)}
					/>
				</div>
				<div>
					<label htmlFor="upperLimit"></label>
					<input
						type="text"
						name="upperLimit"
						id="upperLimit"
						placeholder="Choose Upper Limit"
						value={upperLimit}
						onChange={(e) => updateUpperLimit(e, setUpperLimit)}
					/>
				</div>
			</div>
			{incorrectLimits ? <p className="error">Difference between upper limit and lower limit should be more than 100</p> : null}
			<button type="button" onClick={setLimitWrapper}>
				Set Limits
			</button>
		</fieldset>
	);
};

export default Limits;
