import React from "react";
import styled from "styled-components";
import LoginUI from "../login/LoginUI";

const Login: React.FC = () => {
  return (
    <Container>
      <LoginUI />
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #12002b;
  height: 85vh;
`;
