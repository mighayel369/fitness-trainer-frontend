import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/admin/Dashboard';
import AdminLogin from '../pages/admin/Login';
import UserList from '../pages/admin/UserList';
import UserDetails from '../pages/admin/UserDetails';
import TrainerList from '../pages/admin/TrainerList';
import VerifySinglePage from '../pages/admin/VerifySinglePage';
import TrainerDetails from '../pages/admin/TrainerDetails';
import VerifyTrainer from '../pages/admin/VerifyTrainer';
import AdminPublicRoute from '../components/AdminPublicRoute';
import AdminPrivateRoute from '../components/AdminPrivateRoute';

const AdminRoutes = () => (
  <Routes>
    <Route path="login" element={<AdminPublicRoute><AdminLogin /></AdminPublicRoute>} />
    <Route path="" element={<AdminPrivateRoute><Dashboard /></AdminPrivateRoute>} />
    <Route path="users" element={<AdminPrivateRoute><UserList /></AdminPrivateRoute>} />
    <Route path="users/:id" element={<AdminPrivateRoute><UserDetails /></AdminPrivateRoute>} />
    <Route path="trainers" element={<AdminPrivateRoute><TrainerList /></AdminPrivateRoute>} />
    <Route path="trainers/:id" element={<AdminPrivateRoute><TrainerDetails /></AdminPrivateRoute>} />
    <Route path="verify-trainer" element={<AdminPrivateRoute><VerifyTrainer /></AdminPrivateRoute>} />
    <Route path="verify-trainer/:id" element={<AdminPrivateRoute><VerifySinglePage /></AdminPrivateRoute>} />
  </Routes>
);

export default AdminRoutes;
