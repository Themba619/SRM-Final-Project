
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, FileText, Users, Building, Droplets, TrendingUp } from 'lucide-react';

const cityUsageData = [
  { district: 'North', usage: 45000, households: 1200 },
  { district: 'South', usage: 38000, households: 980 },
  { district: 'East', usage: 52000, households: 1450 },
  { district: 'West', usage: 41000, households: 1100 },
  { district: 'Central', usage: 48000, households: 1300 }
];

const monthlyTrends = [
  { month: 'Jan', total: 224000, average: 187 },
  { month: 'Feb', total: 218000, average: 182 },
  { month: 'Mar', total: 235000, average: 196 },
  { month: 'Apr', total: 245000, average: 204 },
  { month: 'May', total: 258000, average: 215 },
  { month: 'Jun', total: 267000, average: 223 }
];

const usageCategories = [
  { name: 'Residential', value: 65, color: '#0ea5e9' },
  { name: 'Commercial', value: 25, color: '#06b6d4' },
  { name: 'Industrial', value: 10, color: '#0891b2' }
];

export function GovernmentDashboard() {
  const totalHouseholds = cityUsageData.reduce((sum, district) => sum + district.households, 0);
  const totalUsage = cityUsageData.reduce((sum, district) => sum + district.usage, 0);
  const averageUsage = Math.round(totalUsage / totalHouseholds);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Government Dashboard</h1>
          <p className="text-gray-600 mt-1">City-wide water usage analytics and reporting</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Generate Report
          </Button>
          <Button className="flex items-center gap-2 bg-water-600 hover:bg-water-700">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-water-50 to-ocean-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Households</CardTitle>
            <Users className="h-4 w-4 text-water-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHouseholds.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across 5 districts</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-ocean-50 to-water-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <Droplets className="h-4 w-4 text-ocean-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsage.toLocaleString()}L</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-water-50 to-ocean-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average per Household</CardTitle>
            <Building className="h-4 w-4 text-water-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageUsage}L</div>
            <p className="text-xs text-muted-foreground">Per household/month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-ocean-50 to-water-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Rating</CardTitle>
            <TrendingUp className="h-4 w-4 text-ocean-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-green-600">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* District Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Usage by District</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cityUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`${value}L`, 'Usage']} />
                <Bar dataKey="usage" fill="#0ea5e9" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Usage Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`${value}L`, 'Total Usage']} />
                <Line type="monotone" dataKey="total" stroke="#06b6d4" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Usage Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Usage by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={usageCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {usageCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {usageCategories.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-sm">{category.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alert Summary */}
        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-red-800">High Usage Alert</p>
                <p className="text-sm text-red-600">East District exceeding 15% above average</p>
              </div>
              <Button size="sm" variant="outline">View</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-yellow-800">Maintenance Required</p>
                <p className="text-sm text-yellow-600">2 meters need calibration in North District</p>
              </div>
              <Button size="sm" variant="outline">View</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">Conservation Success</p>
                <p className="text-sm text-green-600">South District achieved 10% reduction</p>
              </div>
              <Button size="sm" variant="outline">View</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
