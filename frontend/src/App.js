import React, { useState, useMemo, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import { useGlobalContext } from "./context/globalContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Context } from "./context/Contex";

function App() {
  const [active, setActive] = useState(1);

  const global = useGlobalContext();
  const { user } = useContext(Context);
  console.log(global);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  }

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

//   return (
//     <AppStyled bg={bg} className="App">
//       {orbMemo}
//       <MainLayout>
//         <Router>
//           <Navigation active={active} setActive={setActive} />
//           <main>
//             {user ? displayData() : null}
//              {/* Render displayData only if user is authenticated */}
//             <Routes>
//               <Route
//                 path="/"
//                 element={user ? <Home user={user} /> : <Navigate to="/login" />}
//               />
//               <Route
//                 path="/login"
//                 element={user ? <Navigate to="/" /> : <Login />}
//               />
//               <Route
//                 path="/signup"
//                 element={user ? <Navigate to="/" /> : <Signup />}
//               />
//             </Routes>
//           </main>
//         </Router>
//       </MainLayout>
//     </AppStyled>
//   );
// }


return (
  <AppStyled bg={bg} className="App">
    {orbMemo}
    <MainLayout>
      <Router>
        <Navigation active={active} setActive={setActive} />
        <main>
          <Routes>
            <Route
              path="/"
              element={user ? (
                <>
                  {displayData()}
                  <Home user={user} />
                </>
              ) : (
                <Navigate to="/login" />
              )}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <Signup />}
            />
          </Routes>
        </main>
      </Router>
    </MainLayout>
  </AppStyled>
);
}


const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
};
`;

export default App;
