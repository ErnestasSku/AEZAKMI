import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Users from './pages/Users';
import Home from './pages/Home';
import Layout from './pages/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
