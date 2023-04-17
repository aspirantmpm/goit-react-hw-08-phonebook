import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { lazy } from 'react';
import { selectIsRefreshing } from 'redux/selectors';
import { refresh } from 'redux/operations';
import { useEffect } from 'react';
import { Layout } from './Layout';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRouter';
import { Toaster } from 'react-hot-toast';
const Home = lazy(() => import('../pages/home'));
const Contacts = lazy(() => import('../pages/contacts'));
const Register = lazy(() => import('../pages/register'));
const Login = lazy(() => import('../pages/login'));
const NotFound = lazy(() => import('../pages/notFound'));

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);
  return (
    !isRefreshing && (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="register"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<Register />}
                />
              }
            />
            <Route
              path="login"
              element={
                <RestrictedRoute redirectTo="/contacts" component={<Login />} />
              }
            />
            <Route
              path="contacts"
              element={
                <PrivateRoute redirectTo="/login" component={<Contacts />} />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              duration: 2000,
            },
            error: {
              duration: 2000,
            },
          }}
        />
      </>
    )
  );
};
