import React from 'react'
import styled from 'styled-components';

import { Link, NavLink } from 'react-router-dom';

const NavHeaderStyled = styled.div`
    background-color: #5e5e5e;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
`;

const NavContainer = styled.div`
  padding: 0;
  margin: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
`;

const TitleContainer = styled.div`
  //display: flex;
  //justify-content: center;
`;

const StyledLink = styled(NavLink)`
    text-decoration: none;
    color: inherit;
    font-size: 20px;
    display: flex;
    padding: 0.25rem;
    align-items: stretch;
    
    &.active {
        background-color: #dbdbdb;
        color: black;
    }

    :hover {
        background-color: #a1a1a1;
    }
`;

function NavHeader() {
  return (
    <NavHeaderStyled>
        <TitleContainer>
            <h1>habitual</h1>
        </TitleContainer>
        <NavContainer>
            <StyledLink to="/today">Today</StyledLink> 
            <StyledLink to="/current-habits">Current Habits</StyledLink>
            <StyledLink to="/tracking">Tracking</StyledLink>
        </NavContainer>
    </NavHeaderStyled>
  )
}

export default NavHeader