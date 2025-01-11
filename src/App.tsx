import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LoginForm } from './components/LoginForm';
import { ProductsPage } from './pages/ProductsPage';
import { PrivateRoute } from './services/privateRoute';
import { AuthProvider } from './services/authContext';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
            path="/products"
            element={
              <PrivateRoute>
                <ProductsPage />
              </PrivateRoute>
            }
          />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
     </AuthProvider>
  );
}

export default App;