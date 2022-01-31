import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCurrentUserMutation, getToken, getIsRefreshing } from 'redux/auth';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Container from 'components/Container/Container';
import Section from 'components/Section';
import Navigation from 'components/Navigation/Navigation';

const Home = lazy(() => import('components/Home'));
const ContactsList = lazy(() => import('components/ContactsList'));
const Filter = lazy(() => import('components/Filter/Filter'));
const ContactForm = lazy(() => import('components/ContactForm/ContactForm'));
const EditContactForm = lazy(() => import('components/EditContactForm'));
const LoginForm = lazy(() => import('components/LoginForm'));
const RegisterForm = lazy(() => import('components/RegisterForm/RegisterForm'));

export default function App() {
  const [currentUser] = useCurrentUserMutation();
  const isRefreshing = useSelector(getIsRefreshing);
  const token = useSelector(getToken);

  useEffect(() => {
    token && currentUser();
  }, [token]);

  return (
    <div className="App">
      <Container>
        {isRefreshing ? (
          <ThreeDots color="gray" height={200} width={200} />
        ) : (
          <>
            <Navigation />

            <Suspense
              fallback={<ThreeDots color="gray" height={100} width={100} />}
            >
              <Section>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <PublicRoute>
                        <Home />
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
                        <Filter />
                        <ContactsList />
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

                  <Route
                    path="/edit"
                    element={
                      <PrivateRoute>
                        <EditContactForm />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </Section>
            </Suspense>
          </>
        )}
      </Container>

      <ToastContainer autoClose={5000} />
    </div>
  );
}
