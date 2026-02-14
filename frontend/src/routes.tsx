import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import RoleSelect from './pages/RoleSelect';
import BookParcel from './pages/BookParcel';
import PostOfficeResult from './pages/PostOfficeResult';
import TrackingInput from './pages/TrackingInput';
import TrackingDetails from './pages/TrackingDetails';
import DeliveryConfirmation from './pages/DeliveryConfirmation';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'roles',
                element: <RoleSelect />,
            },
            {
                path: 'book',
                element: <BookParcel />,
            },
            {
                path: 'identify', // Providing alias for book parcel if needed
                element: <BookParcel />,
            },
            {
                path: 'post-office-result',
                element: <PostOfficeResult />,
            },
            {
                path: 'track',
                element: <TrackingInput />,
            },
            {
                path: 'track/:id',
                element: <TrackingDetails />,
            },
            {
                path: 'confirm-delivery',
                element: <DeliveryConfirmation />,
            },
            {
                path: 'admin',
                element: (
                    <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'staff',
                element: (
                    <ProtectedRoute allowedRoles={['staff']}>
                        <StaffDashboard />
                    </ProtectedRoute>
                ),
            },
        ],
    },
], {
    future: {
        v7_startTransition: true,
    }
} as any);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}