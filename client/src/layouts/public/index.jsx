import React from 'react';
import propTypes from 'prop-types';
import Footer from './footer';

const PublicLayout = ({ children }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};
PublicLayout.propTypes = {
  children: propTypes.node.isRequired,
};
export default PublicLayout;
