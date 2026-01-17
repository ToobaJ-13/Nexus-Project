// src/pages/dashboard/DashboardPage.tsx
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { EntrepreneurDashboard } from "./EntrepreneurDashboard";
import { InvestorDashboard } from "./InvestorDashboard";

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <>
      {user.role === "entrepreneur" && <EntrepreneurDashboard />}
      {user.role === "investor" && <InvestorDashboard />}
    </>
  );
};
