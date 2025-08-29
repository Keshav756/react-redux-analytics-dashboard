import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RegisterForm from '../components/auth/RegisterForm';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

const RegisterPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <Header />

      <main className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4 sm:px-6 lg:px-8">
        <RegisterForm
          onSuccess={() => {
            // Optional: Show success message or perform additional actions
            console.log('Registration successful!');
          }}
        />

        <div className="mt-8 text-center">
          <p className="text-sm text-secondary-500">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-primary-600 hover:text-primary-700">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary-600 hover:text-primary-700">
              Privacy Policy
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterPage;
