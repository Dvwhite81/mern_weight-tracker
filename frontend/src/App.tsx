import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import {
  AuthResult,
  WeightType,
  UserType,
  WeightFormData,
} from './utils/types';
import userService from './services/userService';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import './App.css';
import Navbar from './components/NavBar';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);
  const [userWeights, setUserWeights] = useState<WeightType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const checkedLoggedIn = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const result = await userService.getUserByToken(token);
        console.log('checkLogged result:', result);
        if (result) {
          const { success, user } = result;
          console.log('checkLogged success:', success);

          if (success && user) {
            const { user } = result;
            console.log('checkLogged user:', user);

            setLoggedInUser(user);
            setUserWeights(user.weights);
          } else {
            localStorage.removeItem('token');
          }
        }
      }
    };

    checkedLoggedIn();
  }, [navigate]);

  const handleRegister = async (
    username: string,
    password: string,
    confirmation: string
  ) => {
    if (username === '' || password === '' || confirmation === '') {
      toast.error('All fields are required');
      return;
    }

    if (password !== confirmation) {
      toast.error('Passwords must match');
      return;
    }

    const result: AuthResult | undefined = await userService.register(
      username,
      password
    );

    if (result) {
      const { success, message } = result;
      if (success) {
        handleLogin(username, password);
      } else {
        toast.error(message);
      }
    }
  };

  const handleLogin = async (username: string, password: string) => {
    if (username === '' || password === '') {
      toast.error('All fields are required');
      return;
    }

    const result: AuthResult | undefined = await userService.login(
      username,
      password
    );

    console.log('handleLogin result:', result);

    if (result) {
      const { success, message } = result;
      if (success) {
        const { user, token } = result;
        console.log('login USER:', user);
        if (user && token) {
          setLoggedInUser(user);
          localStorage.setItem('token', token);
          setUserWeights(user.weights);
          navigate('/');
        }

        toast.success(message);
      } else {
        toast.error(message);
      }
    }
  };

  const addWeight = async (newWeight: WeightFormData) => {
    const token = localStorage.getItem('token');

    if (!loggedInUser || !token) return;

    console.log('app newWeight:', newWeight);

    const result = await userService.addUserWeight(token, newWeight);

    if (result) {
      const { success, message } = result;

      if (success) {
        toast.success(message);
        console.log('result.weights:', result.weights);
        setUserWeights(result.weights);
      } else {
        toast.error(message);
      }
    }
  };

  const handleDeleteWeight = async (weightId: string) => {
    console.log('handleDeleteWeight weightId:', weightId);
    if (!loggedInUser) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    const result = await userService.deleteUserWeight(token, weightId);
    console.log('handleDelete result:', result);
    if (result) {
      const { success, weights, message } = result;

      if (success) {
        setUserWeights(weights);
        toast.success(message);
      } else {
        toast.error(message);
      }
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
    navigate('/login');
    toast.success('Logged out');
  };

  return (
    <div id="main-container">
      <Navbar loggedInUser={loggedInUser} handleLogOut={handleLogOut} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              loggedInUser={loggedInUser}
              userWeights={userWeights}
              addWeight={addWeight}
              handleDeleteWeight={handleDeleteWeight}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProfilePage
              loggedInUser={loggedInUser}
              userWeights={userWeights}
            />
          }
        />
        <Route
          path="/register"
          element={<RegisterPage handleRegister={handleRegister} />}
        />
        <Route
          path="/login"
          element={<LoginPage handleLogin={handleLogin} />}
        />
      </Routes>
      <ToastContainer theme="colored" newestOnTop />
    </div>
  );
}

export default App;
