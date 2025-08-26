import { Route, Routes, Navigate } from 'react-router-dom';
import MainBody from '../components/MainBody';
import LoginForm from '../Login/Logins.tsx';
import CartPage from '../Cart/Tablecart';
import History_order from '../components/OrderHistory.tsx';
import AccountPage from '../components/Acount.tsx';
import BillResponse from '../components/Bill_response.tsx';
import ProtectedRoute from "./src/components/ProtectedRoute.tsx";

const RouterPage = () => {
  return (
      <Routes>
        <Route path="/" element={<LoginForm />} />

        <Route
            path="/MainBody"
            element={
              <ProtectedRoute>
                <MainBody />
              </ProtectedRoute>
            }
        />
        <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
        />
        <Route
            path="/History" element={
              <ProtectedRoute>
                <History_order />
              </ProtectedRoute>
            }
        />
        <Route
            path="/Acount-table"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
        />
        <Route
            path="/Bill-response"
            element={
              <ProtectedRoute>
                <BillResponse />
              </ProtectedRoute>
            }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  );
};

export default RouterPage;