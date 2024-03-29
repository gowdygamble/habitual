import React, {useState, useEffect} from 'react'
import styled from 'styled-components';

import { Link, NavLink, useNavigate } from 'react-router-dom';
import { GetAuthenticatedUser, logout } from '../functions/CognitoLogic';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/AuthSlice';

const NavHeaderStyled = styled.div`
    background-color: #5e5e5e;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 4px;
  margin-left:16px;
  * {
    margin-right: 8px;
  }
`;

const NavContainer = styled.div`
  //padding: 0;
  //margin: 0;
  height:85px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-right:16px;
  margin-left: 16px;
  
  
`;

const StyledLink = styled(NavLink)`
    text-decoration: none;
    color: inherit;
    font-size: 20px;
    display: flex;
    padding: 0.25rem;
    height: 100%;
    align-items: center;
    font-size:22px;
    &.active {
        background-color: #dbdbdb;
        color: black;
    }

    :hover {
        background-color: #a1a1a1;
    }
`;

function NavHeader() {
  const authenticated = useSelector((state) => state.auth.authenticated)
  const username = useSelector((state) => state.auth.username)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const logoutHandler = () => {
    logout()
    dispatch(authActions.signOut())
    navigate("/login")
  }

  return (
    <NavHeaderStyled>
        <TitleContainer>
            <h1>habitual</h1>
            {authenticated && (<NavContainer>
              <StyledLink to="/today">Today</StyledLink> 
              <StyledLink to="/current-habits">Current Habits</StyledLink>
              <StyledLink to="/tracking">Tracking</StyledLink>
              </NavContainer>
            )}
        </TitleContainer>
        
          { authenticated ? (
            <NavContainer>
              <p style={{'fontSize': '20px'}} onClick={logoutHandler}>Logout</p>
            </NavContainer>
          ) : (
            <NavContainer>
              <StyledLink to="/login">Log In</StyledLink> 
              <StyledLink to="/sign-up">Sign Up</StyledLink> 
            </NavContainer>
          )}
          
        
    </NavHeaderStyled>
  )
}

export default NavHeader