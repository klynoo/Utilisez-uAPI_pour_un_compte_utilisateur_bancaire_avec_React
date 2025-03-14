import styled from "styled-components";

const Footer: React.FC = () => {
  return (
    <Container>
      <Line></Line>
      <Text>Copyright 2020 Argent Bank</Text>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: #e1e4e8;
`;

const Text = styled.footer`
  padding: 30px;
  font-size: 16px;
  color: #555;
  font-family: Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
`;
