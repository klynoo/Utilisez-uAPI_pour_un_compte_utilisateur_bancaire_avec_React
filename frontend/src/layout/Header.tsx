import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState, logout } from "../store";
import styled from "styled-components";
import LogoImg from "../assets/argentBankLogo.png";
import { useNavigate, Link } from "react-router-dom";

const Header: React.FC = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <Container>
      <LogoWrapper to="/">
        <ImgLogo src={LogoImg} alt="Argent Bank Logo" />
      </LogoWrapper>
      {isAuthenticated ? (
        <ContainerButton>
          <IUser className="fa fa-user-circle" />
          <TextUser>{user?.firstName}</TextUser>
          <IUser className="fa fa-sign-out" />
          <StyledButton onClick={handleLogout}>Sign Out</StyledButton>
        </ContainerButton>
      ) : (
        <ContainerButton>
          <IUser className="fa fa-user-circle" />
          <StyledButton onClick={handleSignIn}>Sign In</StyledButton>
        </ContainerButton>
      )}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
`;

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  height: 52px;
`;

const ImgLogo = styled.img`
  height: 100%;
`;

const ContainerButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IUser = styled.i`
  margin-right: -5px;
  font-size: 16px;
`;

const TextUser = styled.span`
  font-weight: bold;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    text-decoration-color: black;
  }
`;

const StyledButton = styled.div`
  border: none;
  border-radius: 5px;
  font-weight: bold;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    text-decoration-color: black;
  }
`;
