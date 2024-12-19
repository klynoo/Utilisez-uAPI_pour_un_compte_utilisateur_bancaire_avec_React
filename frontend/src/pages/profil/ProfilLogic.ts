import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface Transaction {
  transaction_id: string;
  date: string;
  amount: number;
  currency: string;
  type: "credit" | "debit";
  description: string;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface TransactionMap {
  [accountName: string]: Transaction[];
}

interface DataUser {
  user_id: string;
  account_number: string;
  email: string;
  transactions: TransactionMap;
}

export const useProfilLogic = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const [accounts, setAccounts] = useState<TransactionMap>({});

  const data: { users: DataUser[] } = {
    users: [
      {
        user_id: "USR001",
        account_number: "1234567890",
        email: "tony@stark.com",
        transactions: {
          "Compte Courant": [
            {
              transaction_id: "TXN001",
              date: "2023-12-01",
              amount: 5000.0,
              currency: "USD",
              type: "credit",
              description: "Salary Payment",
            },
            {
              transaction_id: "TXN002",
              date: "2023-12-02",
              amount: -300.0,
              currency: "USD",
              type: "debit",
              description: "Stark Industries Purchase",
            },
            {
              transaction_id: "TXN003",
              date: "2023-12-03",
              amount: -120.0,
              currency: "USD",
              type: "debit",
              description: "Electricity Bill Payment",
            },
            {
              transaction_id: "TXN004",
              date: "2023-12-04",
              amount: 2000.0,
              currency: "USD",
              type: "credit",
              description: "Dividends",
            },
            {
              transaction_id: "TXN005",
              date: "2023-12-05",
              amount: -150.0,
              currency: "USD",
              type: "debit",
              description: "Subscription Service",
            },
          ],
          "Compte Segondaire": [
            {
              transaction_id: "TXN001",
              date: "2023-12-01",
              amount: 5000.0,
              currency: "USD",
              type: "credit",
              description: "Salary Payment",
            },
            {
              transaction_id: "TXN002",
              date: "2023-12-02",
              amount: -300.0,
              currency: "USD",
              type: "debit",
              description: "Stark Industries Purchase",
            },
            {
              transaction_id: "TXN003",
              date: "2023-12-03",
              amount: -120.0,
              currency: "USD",
              type: "debit",
              description: "Electricity Bill Payment",
            },
            {
              transaction_id: "TXN004",
              date: "2023-12-04",
              amount: 2000.0,
              currency: "USD",
              type: "credit",
              description: "Dividends",
            },
            {
              transaction_id: "TXN005",
              date: "2023-12-05",
              amount: -150.0,
              currency: "USD",
              type: "debit",
              description: "Subscription Service",
            },
          ],
        },
      },
      {
        user_id: "USR002",
        account_number: "9876543210",
        email: "steve@rogers.com",
        transactions: {
          "Compte Épargne": [
            {
              transaction_id: "TXN006",
              date: "2023-12-06",
              amount: 10000.0,
              currency: "USD",
              type: "credit",
              description: "Wayne Enterprises Dividends",
            },
            {
              transaction_id: "TXN007",
              date: "2023-12-07",
              amount: -500.0,
              currency: "USD",
              type: "debit",
              description: "Batcave Maintenance",
            },
            {
              transaction_id: "TXN008",
              date: "2023-12-08",
              amount: -1200.0,
              currency: "USD",
              type: "debit",
              description: "Charity Donation",
            },
            {
              transaction_id: "TXN009",
              date: "2023-12-09",
              amount: 5000.0,
              currency: "USD",
              type: "credit",
              description: "Consultation Fees",
            },
            {
              transaction_id: "TXN010",
              date: "2023-12-10",
              amount: -600.0,
              currency: "USD",
              type: "debit",
              description: "Luxury Hotel Stay",
            },
          ],
          "Compte Investissement": [
            {
              transaction_id: "TXN011",
              date: "2023-12-11",
              amount: 20000.0,
              currency: "USD",
              type: "credit",
              description: "Investment Growth",
            },
            {
              transaction_id: "TXN012",
              date: "2023-12-12",
              amount: -1000.0,
              currency: "USD",
              type: "debit",
              description: "Brokerage Fees",
            },
          ],
        },
      },
    ],
  };

  useEffect(() => {
    if (user) {
      const userData = data.users.find((u: DataUser) => u.email === user.email);
      if (userData) {
        setAccounts(userData.transactions);
      }
    }
  }, [user]);

  return {
    user,
    isAuthenticated,
    accounts,
  };
};
