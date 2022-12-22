import ReloadGame from "./reloadGame";

const Failed = () => {
	return (
		<section className="failed">
			<h2>Sorry, you exhausted your max attempts 😢</h2>
			<ReloadGame />
		</section>
	);
};

export default Failed;
