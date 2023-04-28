import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Users from './pages/Users';
import Home from './pages/Home';
import Layout from './pages/Layout';
import NoPage from './pages/NoPage';

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
        <Route index path="home" element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="*" element={<NoPage />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
