import ReloadGame from "./reloadGame";

const Failed = () => {
	return (
		<section>
			<h1>Sorry, you exhausted your max attempts 😢</h1>
			<ReloadGame />
		</section>
	);
};

export default Failed;
