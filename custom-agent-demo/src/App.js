import { Route, Routes } from 'react-router-dom'
import OnlineDemo from './components/OnlineDemo'
import AgentDemo from './components/AgentDemo'
import './App.css';

function App() {
  return (
    <Routes>
      <Route key='/' exact path='/' element={<OnlineDemo started />} />
      <Route key='/agent_demo' exact path='/agent_demo' element={<AgentDemo />} />
    </Routes>
  );
}

export default App;
