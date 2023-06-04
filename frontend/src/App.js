import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import {Context} from "./context/Contex"
const rootElement = document.getElementById("root");


function App() {

	const {user}=useContext(Context);

	return (
		<div className="container">
		<BrowserRouter>
			<Routes>
				<Route
					exact
					path="/"
					element={user ? <Home user={user} /> : <Navigate to="/login" />}
				/>
				<Route
					exact
					path="/login" 
					element={user ? <Navigate to="/" /> : <Login />}
				/>
				<Route
					path="/signup"
					element={user ? <Navigate to="/" /> : <Signup />}
				/>
			</Routes>
			</BrowserRouter>
			</div>
		
	);
}

export default App;