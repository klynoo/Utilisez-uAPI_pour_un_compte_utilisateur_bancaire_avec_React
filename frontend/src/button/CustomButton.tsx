import React from "react";
import styled from "styled-components";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const CustomButton: React.FC<ButtonProps> = ({ onClick, children }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default CustomButton;

const StyledButton = styled.div`
  border: none;
  border-radius: 5px;
  font-weight: bold;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  cursor: pointer;
`;
