import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import LoginPage from './features/auth/pages/LoginPage.jsx';
import ProtectedRoute from './ProtectedRoute';
import RegisterPage from './features/auth/pages/RegisterPage.jsx';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer

function App() {
  return (
    <>
      <Routes>
        {/* ProtectedRoute will ensure only authenticated users can access the HomePage */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* LoginPage is accessible to everyone */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      {/* Toast container placed here so it works globally */}
      <ToastContainer />
    </>
  );
}

export default App;