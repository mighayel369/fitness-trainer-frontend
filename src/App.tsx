import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRoutes from './router/UserRoutes';
import AdminRoutes from './router/AdminRoutes';
import TrainerRoutes from './router/TrainerRoutes';
import PageLayout from './layout/PageLayout';
export default function App() {

  
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <PageLayout section="user">
              <UserRoutes />
            </PageLayout>
          }
        />

        <Route
          path="/admin/*"
          element={
            <PageLayout section="admin">
              <AdminRoutes />
            </PageLayout>
          }
        />
        <Route
          path="/trainer/*"
          element={
            <PageLayout section="trainer">
              <TrainerRoutes />
            </PageLayout>
          }
        />
      </Routes>
    </Router>
  )
}
