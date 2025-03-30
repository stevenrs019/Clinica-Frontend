// src/components/PrivateRoute.tsx
import { Navigate } from 'react-router-dom';
import React, { ReactElement } from 'react';

interface Props {
    children: ReactElement;
  }
const PrivateRoute: React.FC<Props> = ({ children }) => {
  const usuario = localStorage.getItem('usuario');

  return usuario ? children : <Navigate to="/" />;
};

export default PrivateRoute;
