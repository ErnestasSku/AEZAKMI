import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Users from './pages/Users';
import Home from './pages/Home';
import Layout from './pages/Layout';
import NoPage from './pages/NoPage';
import Courses from './pages/Courses';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Videos, { VideoView } from './pages/Videos';
import UploadVideo from './pages/UploadVideo';
import CreateCourse from './pages/CreateCourse';

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="" element={<Navigate to="/home" />} />
        <Route path="users" element={<Users />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/create" element={<CreateCourse />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="videos" element={<Videos />} />
        <Route path="videos/:id" element={<VideoView />} />
        <Route path="videos/upload" element={<UploadVideo />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
