import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoginForm } from '../../components/auth/LoginForm';
import { SignUpForm } from '../../components/auth/SignUpForm';
import { CheckSquare } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side with image and info */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 text-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-12">
            <div className="p-1 bg-white rounded">
              <CheckSquare className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold">Taskify</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6">
            Collaborate and manage tasks with ease
          </h1>
          
          <p className="text-lg text-blue-100 mb-8">
            Stay organized, track progress, and achieve your goals with our powerful task management platform.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-500 p-2 rounded-full">
                <CheckSquare className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Real-time collaboration</h3>
                <p className="text-blue-100">Work together with your team in real-time</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-500 p-2 rounded-full">
                <CheckSquare className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Task organization</h3>
                <p className="text-blue-100">Organize tasks by projects, priorities and due dates</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-500 p-2 rounded-full">
                <CheckSquare className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Progress tracking</h3>
                <p className="text-blue-100">Monitor team progress with visual dashboards</p>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-blue-200">
          © 2025 Taskify. All rights reserved.
        </p>
      </div>
      
      {/* Right side with auth form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-gray-600">
              {isLogin 
                ? 'Sign in to continue to your account' 
                : 'Start managing your tasks effectively'}
            </p>
          </div>
          
          {isLogin ? (
            <LoginForm onSuccess={() => {}} />
          ) : (
            <SignUpForm onSuccess={() => {}} />
          )}
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                className="ml-1 text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};