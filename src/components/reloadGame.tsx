export default function ReloadGame() {
	const reload = () => {
		window.location.reload();
	};

	return (
		<button type="button" onClick={reload}>
			Reload game
		</button>
	);
}
