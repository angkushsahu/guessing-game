import ReloadGame from "./reloadGame";

export default function Failed() {
	return (
		<section className="failed">
			<h2>Sorry, you exhausted your max attempts 😢</h2>
			<ReloadGame />
		</section>
	);
}
