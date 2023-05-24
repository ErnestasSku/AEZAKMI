import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import NoPage from './pages/NoPage';
import Courses from './pages/Courses';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Videos, { VideoView } from './pages/Videos';
import UploadVideo from './pages/UploadVideo';
import CreateCourse from './pages/CreateCourse';
import ManageUsers from './pages/ManageUsers';

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="" element={<Navigate to="/courses" />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/create" element={<CreateCourse />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="videos" element={<Videos />} />
        <Route path="videos/:id" element={<VideoView />} />
        <Route path="videos/upload" element={<UploadVideo />} />
        <Route path="users/manage" element={<ManageUsers />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
