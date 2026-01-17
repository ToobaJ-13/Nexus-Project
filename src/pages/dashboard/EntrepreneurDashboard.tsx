// src/pages/dashboard/EntrepreneurDashboard.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Filter, Search, PlusCircle } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { useAuth } from "../../context/AuthContext";
import { investors } from "../../data/users";
import { getRequestsForEntrepreneur } from "../../data/collaborationRequests";
import WalletCard from "../payments/components/WalletCard";
import { InvestorCard } from "../../components/investor/InvestorCard";

import Joyride, { Step } from "react-joyride";
import { CollaborationRequest } from "../../types";

export const EntrepreneurDashboard: React.FC = () => {
  const { user } = useAuth();
  if (!user || user.role !== "entrepreneur") return null;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [walletBalance, setWalletBalance] = useState(20000);

  // Get all requests received by this entrepreneur
  const receivedRequests = getRequestsForEntrepreneur(user.id);

  // Filter investors based on search & selected industries
  const filteredInvestors = investors.filter((inv) => {
    const matchesSearch =
      searchQuery === "" ||
      inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inv.industry?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

    const matchesIndustry =
      selectedIndustries.length === 0 || selectedIndustries.includes(inv.industry || "");

    return matchesSearch && matchesIndustry;
  });

  const industries = Array.from(
    new Set(investors.map((i) => i.industry).filter(Boolean))
  );

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  // --- Joyride steps for guided walkthrough
  const steps: Step[] = [
    {
      target: ".wallet-card",
      content: "This is your wallet. Deposit, withdraw, or transfer funds here.",
    },
    {
      target: ".filters-section",
      content: "Use these filters to find investors by industry or search query.",
    },
    {
      target: ".stats-cards",
      content: "Check your total investors, industries, and connections here.",
    },
    {
      target: ".featured-investors",
      content: "Featured investors are displayed here. Click to view more details.",
    },
    {
      target: ".confirmed-meetings",
      content: "See your confirmed meetings here.",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <Joyride
        steps={steps}
        continuous
        showSkipButton
        showProgress
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Entrepreneur Dashboard</h1>
          <p className="text-gray-600">Manage your startup and connect with investors</p>
        </div>
        <Link to="/investors">
          <Button leftIcon={<PlusCircle size={18} />}>View Investors</Button>
        </Link>
      </div>

      {/* Wallet */}
      <div className="wallet-card">
        <WalletCard
          balance={walletBalance}
          onDeposit={() => setWalletBalance(walletBalance + 1000)}
          onWithdraw={() => setWalletBalance(Math.max(0, walletBalance - 500))}
          onTransfer={() => setWalletBalance(Math.max(0, walletBalance - 2000))}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 filters-section">
        <Input
          placeholder="Search investors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          startAdornment={<Search size={18} />}
        />
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={18} className="text-gray-500" />
          {industries.map((industry) => (
            <div key={industry} className="cursor-pointer" onClick={() => toggleIndustry(industry)}>
              <Badge variant={selectedIndustries.includes(industry) ? "primary" : "gray"}>
                {industry}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stats-cards">
        <Card>
          <CardBody>
            <p className="text-sm text-gray-500">Total Investors</p>
            <h3 className="text-xl font-semibold">{investors.length}</h3>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-sm text-gray-500">Industries</p>
            <h3 className="text-xl font-semibold">{industries.length}</h3>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-sm text-gray-500">Connections</p>
            <h3 className="text-xl font-semibold">
              {receivedRequests.filter((r: CollaborationRequest) => r.status === "accepted").length}
            </h3>
          </CardBody>
        </Card>
      </div>

      {/* Featured Investors */}
      <Card className="featured-investors">
        <CardHeader>
          <h2 className="text-lg font-medium">Featured Investors</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvestors.length === 0 ? (
              <p className="text-gray-500 col-span-full">No investors found.</p>
            ) : (
              filteredInvestors.map((inv) => <InvestorCard key={inv.id} investor={inv} />)
            )}
          </div>
        </CardBody>
      </Card>

      {/* Confirmed Meetings */}
      <Card className="confirmed-meetings">
        <CardHeader>
          <h2 className="text-lg font-medium">Confirmed Meetings</h2>
        </CardHeader>
        <CardBody className="space-y-3">
          <p className="text-sm">Startup Pitch Review — Jan 18, 11:00 AM</p>
          <p className="text-sm">Investor Feedback Session — Jan 21, 3:00 PM</p>
        </CardBody>
      </Card>
    </div>
  );
};
