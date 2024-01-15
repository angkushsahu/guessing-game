import ReloadGame from "./reloadGame";

export interface FailedProps {
	randomNumber: number;
}

export default function Failed({ randomNumber }: FailedProps) {
	return (
		<section className="failed">
			<h2>Sorry, you exhausted your max attempts 😢</h2>
			<h3>The answer is {randomNumber}</h3>
			<ReloadGame />
		</section>
	);
}
