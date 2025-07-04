
import { DollarSign, School, Users, TrendingUp, Building, Heart, FileText, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RevenueStream {
  id: string;
  name: string;
  description: string;
  monthlyRevenue: number;
  customers: number;
  icon: any;
  status: 'active' | 'pending' | 'projected';
}

interface SchoolSubscription {
  id: string;
  name: string;
  students: number;
  pricePerStudent: number;
  status: 'active' | 'trial' | 'expired';
  startDate: string;
}

const MonetizationDashboard = () => {
  const revenueStreams: RevenueStream[] = [
    {
      id: '1',
      name: 'School Subscriptions',
      description: 'Annual subscriptions from educational institutions',
      monthlyRevenue: 15000,
      customers: 25,
      icon: School,
      status: 'active'
    },
    {
      id: '2',
      name: 'Premium Journal Unlock',
      description: 'Advanced journaling features and analytics',
      monthlyRevenue: 3200,
      customers: 800,
      icon: FileText,
      status: 'active'
    },
    {
      id: '3',
      name: 'NGO Partnerships',
      description: 'Licensing to mental health organizations',
      monthlyRevenue: 8500,
      customers: 12,
      icon: Heart,
      status: 'active'
    },
    {
      id: '4',
      name: 'Analytics Reports',
      description: 'Anonymized trend data for safety organizations',
      monthlyRevenue: 5200,
      customers: 8,
      icon: BarChart3,
      status: 'projected'
    }
  ];

  const schoolSubscriptions: SchoolSubscription[] = [
    {
      id: '1',
      name: 'Lincoln High School',
      students: 1200,
      pricePerStudent: 2.5,
      status: 'active',
      startDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Green Valley Academy',
      students: 800,
      pricePerStudent: 2.5,
      status: 'active',
      startDate: '2024-02-01'
    },
    {
      id: '3',
      name: 'City College Prep',
      students: 1500,
      pricePerStudent: 2.0,
      status: 'trial',
      startDate: '2024-06-15'
    }
  ];

  const totalMonthlyRevenue = revenueStreams
    .filter(stream => stream.status === 'active')
    .reduce((sum, stream) => sum + stream.monthlyRevenue, 0);

  const projectedAnnualRevenue = totalMonthlyRevenue * 12 + 
    revenueStreams
      .filter(stream => stream.status === 'projected')
      .reduce((sum, stream) => sum + stream.monthlyRevenue * 6, 0); // Assume projected starts mid-year

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'trial': return 'bg-blue-100 text-blue-800';
      case 'projected': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Monetization Dashboard</h2>
        <p className="text-gray-600">
          Simulated revenue model for SafeSpace platform
        </p>
      </div>

      {/* Revenue Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <CardTitle className="text-lg">Monthly Revenue</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${totalMonthlyRevenue.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 mt-1">Active streams only</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">Projected Annual</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${projectedAnnualRevenue.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 mt-1">Including projections</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-lg">Total Customers</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {revenueStreams.reduce((sum, stream) => sum + stream.customers, 0)}
            </div>
            <p className="text-sm text-gray-600 mt-1">Across all streams</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Streams */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
          Revenue Streams
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {revenueStreams.map((stream) => {
            const IconComponent = stream.icon;
            return (
              <Card key={stream.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <IconComponent size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-semibold text-gray-800">
                          {stream.name}
                        </CardTitle>
                        <CardDescription className="text-xs text-gray-600 mt-1">
                          {stream.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(stream.status)}>
                      {stream.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg font-bold text-green-600">
                        ${stream.monthlyRevenue.toLocaleString()}/mo
                      </div>
                      <div className="text-sm text-gray-600">
                        {stream.customers} customers
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* School Subscriptions */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
          School Subscriptions
        </h3>
        <div className="space-y-3">
          {schoolSubscriptions.map((school) => (
            <Card key={school.id}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Building size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{school.name}</div>
                      <div className="text-sm text-gray-600">
                        {school.students} students • ${school.pricePerStudent}/student/month
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(school.status)}>
                      {school.status}
                    </Badge>
                    <div className="text-sm font-semibold text-green-600 mt-1">
                      ${(school.students * school.pricePerStudent).toLocaleString()}/mo
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Next Steps for Growth</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Expand to 50+ schools by end of year</li>
          <li>• Launch premium analytics dashboard</li>
          <li>• Partner with 5 major NGOs for licensing deals</li>
          <li>• Develop WhatsApp integration for broader reach</li>
        </ul>
      </div>
    </div>
  );
};

export default MonetizationDashboard;
