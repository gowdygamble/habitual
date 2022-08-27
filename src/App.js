import './App.css';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

//display: "flex",
//justifyContent: "center"

function App() {
  return (
    <div className="App">
      <TitleContainer>
        <h1>Spiritus Mundi</h1>
      </TitleContainer>
      <NavContainer>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
          
        }}
      >
        <Link to="/today">Today</Link> | {" "}
        <Link to="/current-habits">Current Habits</Link> | {" "}
        <Link to="/tracking">Tracking</Link>
      </nav>
      </NavContainer>
      <Outlet />
    </div>
  );
}

export default App;
