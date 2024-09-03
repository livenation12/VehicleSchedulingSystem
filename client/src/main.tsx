import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserRoot from './user/features/UserRoot.tsx';
import Home from './user/features/Home.tsx';
import Calendar from './user/features/CalendarRequest.tsx';
import PageNotFound from './user/features/PageNotFound.tsx';
import Vehicles from './user/features/Vehicles.tsx';
import Gate from './admin/features/Gate.tsx';
import Dashboard from './admin/features/Dashboard.tsx';
import Login from './user/features/Login.tsx';
import { Toaster } from './components/ui/toaster.tsx';
import AdminRoot from './admin/features/AdminRoot.tsx';
import AdminVehicles from './admin/features/AdminVehicles.tsx';
import AdminUsers from './admin/features/AdminUsers.tsx';
import { AuthProvider } from './user/contexts/AuthContext.tsx';
import ProtectedRoutes from './user/components/ProtectedRoutes.tsx';
import { CalendarProvider } from './user/contexts/CalendarContext.tsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <UserRoot />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'calendar',
        element:
          <ProtectedRoutes>
            <CalendarProvider>
              <Calendar />
            </CalendarProvider>
          </ProtectedRoutes>
      },
      {
        path: 'vehicles',
        element:
          <ProtectedRoutes>
            <Vehicles />
          </ProtectedRoutes>
      },
      {
        path: '*',
        element: <PageNotFound />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/admin',
    element: <AdminRoot />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'vehicles',
        element: <AdminVehicles />
      },
      {
        path: 'users',
        element: <AdminUsers />
      },
      {
        path: '*',
        element: <PageNotFound />
      }
    ]
  },
  {
    path: '/admin/gate',
    element: <Gate />
  },

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Toaster />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
