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
import AgentLogin from './pages/AgentLogin';
import AgentDashboard from './pages/AgentDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
import AIDeliveryPrediction from './pages/AIDeliveryPrediction';

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
                element: (
                    <ProtectedRoute>
                        <BookParcel />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'identify', // Providing alias for book parcel if needed
                element: (
                    <ProtectedRoute>
                        <BookParcel />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'post-office-result',
                element: (
                    <ProtectedRoute>
                        <PostOfficeResult />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'track',
                element: (
                    <ProtectedRoute>
                        <TrackingInput />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'track/:id',
                element: (
                    <ProtectedRoute>
                        <TrackingDetails />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'prediction',
                element: (
                    <ProtectedRoute>
                        <AIDeliveryPrediction />
                    </ProtectedRoute>
                ),
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
            {
                path: 'agent/login',
                element: <AgentLogin />,
            },
            {
                path: 'agent/dashboard',
                element: (
                    <ProtectedRoute allowedRoles={['agent']}>
                        <AgentDashboard />
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