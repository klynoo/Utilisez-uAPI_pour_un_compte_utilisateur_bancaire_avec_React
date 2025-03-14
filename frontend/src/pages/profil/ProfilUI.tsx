import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState, updateProfileThunk, useAppDispatch } from "../../store";
import { useProfilLogic } from "./ProfilLogic";

const ProfilUI: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, accounts } = useProfilLogic();

  const token = useSelector((state: RootState) => state.auth.token);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [editing, setEditing] = useState(false);

  // Synchronisation de l'état local avec Redux
  useEffect(() => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
  }, [user]);

  const handleUpdate = async () => {
    if (!token) {
      console.error("Aucun token pour l'appel API de mise à jour !");
      return;
    }
    try {
      await dispatch(
        updateProfileThunk({
          token,
          userData: { firstName, lastName },
        })
      ).unwrap();
      setEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
    }
  };

  const handleCancel = () => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setEditing(false);
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <ProfileContainer>
      <Header>
        <HeaderTitle>
          Welcome back <br />
          {editing ? (
            <>
              <FieldGroup>
                <InputField
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <InputField
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FieldGroup>
              <ButtonGroup>
                <SaveButton onClick={handleUpdate}>Save</SaveButton>
                <CancelButton onClick={handleCancel}>Cancel</CancelButton>
              </ButtonGroup>
            </>
          ) : (
            <>
              {user?.firstName} {user?.lastName}!
              <EditButton onClick={() => setEditing(true)}>
                Edit Name
              </EditButton>
            </>
          )}
        </HeaderTitle>
      </Header>

      {Object.entries(accounts).map(([accountName, transactions]) => {
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
  min-height: 80vh;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const HeaderTitle = styled.h1`
  display: flex;
  flex-direction: column;
  color: #fff;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin: 10px auto;
  padding-left: 10px;
`;

const SaveButton = styled.button`
  background-color: #00bc77;
  border: none;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #009d6e;
  }
`;

const CancelButton = styled.button`
  background-color: #ff4d4f;
  border: none;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e04444;
  }
`;

const EditButton = styled.button`
  width: 90px;
  margin: 10px auto;
  background-color: #00bc77;
  border-color: #00bc77;
  color: white;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 10px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
`;

const FieldGroup = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row;
  margin: 10px auto;
`;

const InputField = styled.input`
  width: 150px;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;

  &:focus {
    border-color: #00bc77;
    outline: none;
  }
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
  margin: 0px 150px 2rem 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ViewButton = styled.button`
  display: block;
  width: 12%;
  padding: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 1rem;
  border-color: #00bc77;
  background-color: #00bc77;
  color: #fff;
`;
