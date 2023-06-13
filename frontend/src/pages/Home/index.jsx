import styles from "./styles.module.css";
import { useState,useContext,useMemo } from "react";
import { Context } from "../../context/Contex";
import Dashboard from "../../Components/Dashboard/Dashboard";
import Income from "../../Components/Income/Income";
import Expenses from "../../Components/Expenses/Expenses";
import Navigation from "../../Components/Navigation/Navigation";
import { useGlobalContext } from "../../context/globalContext";
import Orb from "../../Components/Orb/Orb";
import bg from "../../img/bg.png";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "../../styles/Layouts";
import styled from "styled-components";

function Home() {
  const [active, setActive] = useState(1);
  const global = useGlobalContext();
  const { user } = useContext(Context);
  //console.log(global);

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
	


	return (
		<AppStyled bg={bg} className="App">
     {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
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
`;


export default Home;