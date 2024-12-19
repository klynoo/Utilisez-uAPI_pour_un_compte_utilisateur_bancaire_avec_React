import React from "react";
import { useParams, Navigate } from "react-router-dom";
import styled from "styled-components";
import { useProfilLogic } from "./pages/profil/ProfilLogic";

const AccountDetailsUI: React.FC = () => {
  const { accountName } = useParams();
  const { isAuthenticated, accounts } = useProfilLogic();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!accountName || !accounts[accountName]) {
    return <p>Account not found.</p>;
  }

  const transactions = accounts[accountName];

  return (
    <DetailsContainer>
      <Header>
        <h1>{accountName}</h1>
      </Header>

      {transactions.map((transaction) => (
        <TransactionCard key={transaction.transaction_id}>
          <TransactionContent>
            <h3>{transaction.description}</h3>
            <p>
              {transaction.amount.toLocaleString("en-US", {
                style: "currency",
                currency: transaction.currency,
              })}
            </p>
            <p>
              {transaction.type === "credit"
                ? "Available Balance"
                : "Current Balance"}
            </p>
            <p>Date: {transaction.date}</p>
          </TransactionContent>
        </TransactionCard>
      ))}
    </DetailsContainer>
  );
};

export default AccountDetailsUI;

const DetailsContainer = styled.div`
  background-color: #130046;
  color: white;
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const TransactionCard = styled.div`
  background-color: white;
  color: #000;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const TransactionContent = styled.div`
  h3 {
    margin: 0;
  }

  p {
    margin: 5px 0;
    font-size: 14px;
  }

  p:nth-child(2) {
    font-size: 18px;
  }
`;
