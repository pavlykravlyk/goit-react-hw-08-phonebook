import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCurrentUserMutation, getToken } from 'redux/auth';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Container from 'components/Container/Container';
import Section from './components/Section/Section';
import Navigation from 'components/Navigation/Navigation';

const ContactList = lazy(() => import('components/ContactList/ContactList'));
const ContactForm = lazy(() => import('components/ContactForm/ContactForm'));
const LoginForm = lazy(() => import('components/LoginForm/LoginForm'));
const RegisterForm = lazy(() => import('components/RegisterForm/RegisterForm'));

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
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <h1>PHONEBOOK</h1>
                  </PublicRoute>
                }
              />

              <Route
                path="/register"
                element={
                  <PublicRoute restricted>
                    <RegisterForm />
                  </PublicRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute restricted>
                    <LoginForm />
                  </PublicRoute>
                }
              />

              <Route
                path="/contacts"
                element={
                  <PrivateRoute>
                    <ContactList />
                  </PrivateRoute>
                }
              />

              <Route
                path="/create"
                element={
                  <PrivateRoute>
                    <ContactForm />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
        </Section>
      </Container>

      <ToastContainer autoClose={3000} />
    </div>
  );
}
