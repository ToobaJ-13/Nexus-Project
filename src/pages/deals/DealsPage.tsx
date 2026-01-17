import React, { useState } from 'react';
import {
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';

import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';

/* ---------------- MOCK DEAL DATA ---------------- */

const deals = [
  {
    id: 1,
    startup: {
      name: 'TechWave AI',
      logo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      industry: 'FinTech'
    },
    amount: '$1.5M',
    equity: '15%',
    status: 'Due Diligence',
    stage: 'Series A',
    lastActivity: '2024-02-15'
  },
  {
    id: 2,
    startup: {
      name: 'GreenLife Solutions',
      logo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      industry: 'CleanTech'
    },
    amount: '$2M',
    equity: '20%',
    status: 'Term Sheet',
    stage: 'Seed',
    lastActivity: '2024-02-10'
  },
  {
    id: 3,
    startup: {
      name: 'HealthPulse',
      logo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      industry: 'HealthTech'
    },
    amount: '$800K',
    equity: '12%',
    status: 'Negotiation',
    stage: 'Pre-seed',
    lastActivity: '2024-02-05'
  }
];

/* ---------------- COMPONENT ---------------- */

export const DealsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const statuses = [
    'Due Diligence',
    'Term Sheet',
    'Negotiation',
    'Closed',
    'Passed'
  ];

  /* ---------------- HELPERS ---------------- */

  const toggleStatus = (status: string) => {
    setSelectedStatus(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Due Diligence':
        return 'primary';
      case 'Term Sheet':
        return 'secondary';
      case 'Negotiation':
        return 'accent';
      case 'Closed':
        return 'success';
      case 'Passed':
        return 'error';
      default:
        return 'gray';
    }
  };

  const filteredDeals = deals.filter(deal => {
    const matchesSearch =
      searchQuery === '' ||
      deal.startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.startup.industry.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus.length === 0 ||
      selectedStatus.includes(deal.status);

    return matchesSearch && matchesStatus;
  });

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Investment Deals</h1>
          <p className="text-gray-600">
            Track and manage your investment pipeline
          </p>
        </div>

        <Button>Add Deal</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-lg mr-3">
                <DollarSign size={20} className="text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Investment</p>
                <p className="text-lg font-semibold">$4.3M</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-secondary-100 rounded-lg mr-3">
                <TrendingUp size={20} className="text-secondary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Deals</p>
                <p className="text-lg font-semibold">8</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-accent-100 rounded-lg mr-3">
                <Users size={20} className="text-accent-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Portfolio Companies</p>
                <p className="text-lg font-semibold">12</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-success-100 rounded-lg mr-3">
                <Calendar size={20} className="text-success-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Closed This Month</p>
                <p className="text-lg font-semibold">2</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search deals by startup or industry..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            startAdornment={<Search size={18} />}
            fullWidth
          />
        </div>

        <div className="w-full md:w-1/3">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />

            <div className="flex flex-wrap gap-2">
              {statuses.map(status => (
                <div
                  key={status}
                  className="cursor-pointer"
                  onClick={() => toggleStatus(status)}
                >
                  <Badge
                    variant={
                      selectedStatus.includes(status)
                        ? getStatusColor(status)
                        : 'gray'
                    }
                  >
                    {status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Deals Table */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">Active Deals</h2>
        </CardHeader>

        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Startup
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Equity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Stage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Last Activity
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredDeals.map(deal => (
                  <tr key={deal.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Avatar
                          src={deal.startup.logo}
                          alt={deal.startup.name}
                          size="sm"
                        />
                        <div className="ml-4">
                          <p className="font-medium">{deal.startup.name}</p>
                          <p className="text-sm text-gray-500">
                            {deal.startup.industry}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">{deal.amount}</td>
                    <td className="px-6 py-4">{deal.equity}</td>

                    <td className="px-6 py-4">
                      <Badge variant={getStatusColor(deal.status)}>
                        {deal.status}
                      </Badge>
                    </td>

                    <td className="px-6 py-4">{deal.stage}</td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(deal.lastActivity).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredDeals.length === 0 && (
              <p className="text-center text-gray-500 py-6">
                No deals match your filters
              </p>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
