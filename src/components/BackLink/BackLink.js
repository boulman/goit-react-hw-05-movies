import React from 'react';
import { Link } from 'react-router-dom';
import { GiReturnArrow } from 'react-icons/gi';

export function BackLink({ to, children }) {
  return (
    <Link to={to}>
      <GiReturnArrow />
      Return to previous page
    </Link>
  );
}
