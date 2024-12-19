import React, { useState } from "react";
import styled from "styled-components";
import { useLoginLogic } from "./loginLogic"; // Assurez-vous que ce fichier existe dans le même dossier

const LoginUI: React.FC = () => {
  const { handleLogin } = useLoginLogic();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errorMessage = handleLogin({ email, password, rememberMe });
    if (errorMessage) {
      setError(errorMessage);
    } else {
      setError(null);
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <IUser className="fa fa-user-circle" />
      <Title>Sign in</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <InputGroup>
        <Label>Username</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputGroup>
      <CheckboxGroup>
        <Checkbox
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <CheckboxLabel>Remember me</CheckboxLabel>
      </CheckboxGroup>
      <SubmitButton type="submit">Sign in</SubmitButton>
    </LoginForm>
  );
};

export default LoginUI;

const LoginForm = styled.form`
  max-width: 260px;
  margin: 0 auto;
  padding: 40px 30px;
  flex: 1;
  background-color: white;
`;

const IUser = styled.i`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-size: 16px;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: bold;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #2c3e50;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const CheckboxLabel = styled.label`
  font-size: 16px;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 1.1rem;
  color: #fff;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: #00bc77;
  border: none;
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 15px;
  text-align: center;
  font-size: 14px;
`;
