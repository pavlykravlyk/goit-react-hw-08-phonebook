import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Container from './components/Container/Container';
// import Section from './components/Section/Section';
import ContactList from './components/ContactList';
import ContactForm from 'components/ContactForm/ContactForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from 'components/Navigation/Navigation';
import Register from 'components/Navigation/RegisterForm';
import Login from 'components/Navigation/LoginForm';
import { ThreeDots } from 'react-loader-spinner';
import { useCurrentUserMutation } from 'redux/auth';
import { useSelector } from 'react-redux';
import { getToken } from 'redux/auth';

export default function App() {
  const [currentUser] = useCurrentUserMutation();
  const token = useSelector(getToken);

  useEffect(() => {
    token && currentUser();
  }, [token]);

  return (
    <div className="App">
      <Container>
        <Navigation />

        <Suspense fallback={<ThreeDots color="gray" height={80} width={80} />}>
          <Routes>
            <Route path="/" element={<h1>PHONEBOOK</h1>} />
            <Route path="/create" element={<ContactForm />} />
            <Route path="/contacts" element={<ContactList />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </Container>

      <ToastContainer autoClose={3000} />
    </div>
  );
}
