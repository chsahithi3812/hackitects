import React, {  useContext } from "react";
import { BrowserRouter , Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Context } from "./context/Contex";

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
