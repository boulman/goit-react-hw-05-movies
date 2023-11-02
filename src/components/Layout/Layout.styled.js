import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  padding: 30px;
  box-shadow: 1px 1px 1px grey;
`;

export const StyledNLink = styled(NavLink)`
  margin-left: 12px;
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  color: #170729;

  &.active {
    color: #9c5b1a;
    text-decoration: underline;
  }
`;
