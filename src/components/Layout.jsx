import { Header } from 'components/Header';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { ThreeDots } from 'react-loader-spinner';

export const Layout = () => {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <ThreeDots
            height="80"
            width="80"
            radius="7"
            color="#1976d2"
            ariaLabel="three-dots-loading"
            visible={true}
            wrapperStyle={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          />
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
};
