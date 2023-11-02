import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Nav, StyledNLink } from './Layout.styled';

export function Layout() {
  return (
    <div>
      <header>
        <Nav>
          <StyledNLink to="/">Home</StyledNLink>
          <StyledNLink to="/movies">Movies</StyledNLink>
        </Nav>
      </header>

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
