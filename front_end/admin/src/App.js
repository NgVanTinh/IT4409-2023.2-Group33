import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/admin' element={<MainLayout/>}/>
      <Route index element={<Dashboard />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
