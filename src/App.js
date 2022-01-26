import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCurrentUserMutation, getToken } from 'redux/auth';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Container from 'components/Container/Container';
import Section from './components/Section/Section';
import Navigation from 'components/Navigation/Navigation';

const ContactList = lazy(() => import('components/ContactList/ContactList'));
const ContactForm = lazy(() => import('components/ContactForm/ContactForm'));
const RegisterForm = lazy(() => import('components/Navigation/RegisterForm'));
const LoginForm = lazy(() => import('components/Navigation/LoginForm'));

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
        <Section>
          <Suspense
            fallback={<ThreeDots color="gray" height={100} width={100} />}
          >
            <Routes>
              <Route path="/" element={<h1>PHONEBOOK</h1>} />
              <Route path="/contacts" element={<ContactList />} />
              <Route path="/create" element={<ContactForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<LoginForm />} />
            </Routes>
          </Suspense>
        </Section>
      </Container>

      <ToastContainer autoClose={3000} />
    </div>
  );
}
