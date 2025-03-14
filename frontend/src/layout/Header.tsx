import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, logout } from "../store";
import styled from "styled-components";
import LogoImg from "../assets/argentBankLogo.png";
import CustomButton from "../button/CustomButton";
import { useNavigate, Link } from "react-router-dom";

const Header: React.FC = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
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
        <div>
          <CustomButton onClick={handleLogout}>Sign Out</CustomButton>
        </div>
      ) : (
        <ContainerButton>
          <IUser className="fa fa-user-circle" />
          <CustomButton onClick={handleSignIn}>Sign In</CustomButton>
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
