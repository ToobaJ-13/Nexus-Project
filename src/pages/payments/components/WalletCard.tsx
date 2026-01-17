import React from "react";
import { ArrowDownLeft, ArrowUpRight, Send } from "lucide-react";

interface WalletCardProps {
  balance: number;
  onDeposit?: () => void;
  onWithdraw?: () => void;
  onTransfer?: () => void;
}

const WalletCard: React.FC<WalletCardProps> = ({
  balance,
  onDeposit,
  onWithdraw,
  onTransfer,
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Wallet Balance
      </h2>

      <p className="text-3xl font-bold text-primary-600 mb-6">
        ${balance.toLocaleString()}
      </p>

      <div className="flex gap-3">
        <button
          onClick={onDeposit}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 text-sm font-medium"
        >
          <ArrowDownLeft size={16} />
          Deposit
        </button>

        <button
          onClick={onWithdraw}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 text-sm font-medium"
        >
          <ArrowUpRight size={16} />
          Withdraw
        </button>

        <button
          onClick={onTransfer}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm font-medium"
        >
          <Send size={16} />
          Transfer
        </button>
      </div>
    </div>
  );
};

export default WalletCard;
