import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useProfilLogic } from "./ProfilLogic";

const ProfilUI: React.FC = () => {
  const { user, isAuthenticated, accounts } = useProfilLogic();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <ProfileContainer>
      <Header>
        <HeaderTitle>
          Welcome back
          <br />
          {user?.firstName} {user?.lastName}!
        </HeaderTitle>
        <EditButton>Edit Name</EditButton>
      </Header>

      {Object.entries(accounts).map(([accountName, transactions]) => {
        // Calcul du solde total
        const totalBalance = transactions.reduce((sum, t) => sum + t.amount, 0);

        return (
          <TransactionCard key={accountName}>
            <div>
              <AccountName>{accountName}</AccountName>
              <AccountBalance>
                {totalBalance.toLocaleString("en-US", {
                  style: "currency",
                  currency: transactions[0]?.currency || "USD",
                })}
              </AccountBalance>
              <AccountName>Available Balance</AccountName>
            </div>
            <ViewButton
              onClick={() =>
                navigate(`/account/${encodeURIComponent(accountName)}`)
              }
            >
              View transactions
            </ViewButton>
          </TransactionCard>
        );
      })}
    </ProfileContainer>
  );
};

export default ProfilUI;

const ProfileContainer = styled.div`
  background-color: #12002b;
  color: white;
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const HeaderTitle = styled.h1`
  color: #fff;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-bottom: 20px;
`;

const EditButton = styled.button`
  background-color: #00bc77;
  border-color: #00bc77;
  color: white;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 10px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
`;

const AccountName = styled.h2`
  margin: 0;
  font-size: 1rem;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: normal;
`;

const AccountBalance = styled.p`
  font-size: 2.5rem;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: bold;
`;

const TransactionCard = styled.div`
  background-color: white;
  color: #000;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ViewButton = styled.button`
  display: block;
  width: 25%;
  padding: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 1rem;
  border-color: #00bc77;
  background-color: #00bc77;
  color: #fff;
`;
