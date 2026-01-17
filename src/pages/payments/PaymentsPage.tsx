import React, { useState } from "react";
import WalletCard from "./components/WalletCard";

interface Transaction {
  id: number;
  amount: number;
  sender: string;
  receiver: string;
  status: "Completed" | "Pending" | "Failed";
}

const PaymentsPage: React.FC = () => {
  const [balance, setBalance] = useState(25000);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      amount: 5000,
      sender: "Investor",
      receiver: "Entrepreneur",
      status: "Completed",
    },
    {
      id: 2,
      amount: 2000,
      sender: "Entrepreneur",
      receiver: "Platform",
      status: "Pending",
    },
  ]);

  const handleDeposit = () => {
    setBalance((prev) => prev + 1000);
    addTransaction(1000, "Bank", "Wallet", "Completed");
  };

  const handleWithdraw = () => {
    setBalance((prev) => prev - 500);
    addTransaction(500, "Wallet", "Bank", "Completed");
  };

  const handleTransfer = () => {
    setBalance((prev) => prev - 2000);
    addTransaction(2000, "Investor", "Entrepreneur", "Completed");
  };

  const addTransaction = (
    amount: number,
    sender: string,
    receiver: string,
    status: Transaction["status"]
  ) => {
    setTransactions((prev) => [
      {
        id: prev.length + 1,
        amount,
        sender,
        receiver,
        status,
      },
      ...prev,
    ]);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Payments</h1>

      {/* Wallet */}
      <WalletCard
        balance={balance}
        onDeposit={handleDeposit}
        onWithdraw={handleWithdraw}
        onTransfer={handleTransfer}
      />

      {/* Transactions */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Transaction History
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-2 text-left">Amount</th>
                <th className="py-2 text-left">Sender</th>
                <th className="py-2 text-left">Receiver</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b last:border-none">
                  <td className="py-3 font-medium">
                    ${tx.amount.toLocaleString()}
                  </td>
                  <td className="py-3">{tx.sender}</td>
                  <td className="py-3">{tx.receiver}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tx.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : tx.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
