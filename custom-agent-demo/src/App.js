import { Route, Routes } from 'react-router-dom'
import OnlineDemo from './components/OnlineDemo'
import './App.css';

function App() {
  return (
    <Routes>
      <Route key='/' exact path='/' element={<OnlineDemo started />} />
    </Routes>
  );
}

export default App;
