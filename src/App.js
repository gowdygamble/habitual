import './App.css';
import { Outlet } from 'react-router-dom';
import NavHeader from './component/NavHeader';


function App() {
  return (
    <div className="App">
      <NavHeader />
      <Outlet />
    </div>
  );
}

export default App;
