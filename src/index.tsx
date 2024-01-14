import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "styles/index.css";
import App from "./app";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
