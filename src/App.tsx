import { ToastContainer } from "react-toastify";
import "./App.css";
import Home from "./pages/home";

function App() {
	return (
		<>
			<Home />
			<ToastContainer position="top-right" />
		</>
	);
}

export default App;
