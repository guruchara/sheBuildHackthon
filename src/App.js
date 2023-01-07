import { Route, Routes } from 'react-router-dom';
import './App.css';
import Fireauth from './components/Fireauth';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Fireauth/>} />
      </Routes>
    </div>
  );
}

export default App;