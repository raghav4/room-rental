import React from 'react';
import propTypes from 'prop-types';
import Navbar from './navbar';
import Footer from './footer';

const PrivateLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
PrivateLayout.propTypes = {
  children: propTypes.node.isRequired,
};
export default PrivateLayout;
