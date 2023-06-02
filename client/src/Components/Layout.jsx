import Navbar from '../Components/Navbar';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Footer />
      <Outlet />
    </>
  );
};

export default Layout;
