import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';
import { BarChart3, Home } from 'lucide-react';

const policyData = [
  { month: 'Jan', consumption: 2850000, target: 2700000, conservation: 5.2 },
  { month: 'Feb', consumption: 2920000, target: 2700000, conservation: 4.8 },
  { month: 'Mar', consumption: 2780000, target: 2700000, conservation: 6.1 },
  { month: 'Apr', consumption: 2650000, target: 2700000, conservation: 7.3 },
  { month: 'May', consumption: 2580000, target: 2700000, conservation: 8.5 },
];

const regionalData = [
  { region: 'Central', population: 180000, avgUsage: 145, trend: '+2.3%' },
  { region: 'North', population: 220000, avgUsage: 158, trend: '-1.2%' },
  { region: 'South', population: 195000, avgUsage: 142, trend: '-3.1%' },
  { region: 'East', population: 210000, avgUsage: 162, trend: '+1.8%' },
  { region: 'West', population: 240000, avgUsage: 155, trend: '-0.5%' },
];

const conservationPrograms = [
  { program: 'Rainwater Harvesting Incentive', participants: 15420, savings: '2.3M L/month' },
  { program: 'Smart Meter Deployment', participants: 45600, savings: '5.8M L/month' },
  { program: 'Public Awareness Campaign', participants: 89000, savings: '12.1M L/month' },
  { program: 'Industrial Efficiency Program', participants: 156, savings: '18.5M L/month' },
];

export function GovernmentDashboard() {
  // Use regionalData for metrics
  const totalHouseholds = regionalData.reduce((sum, region) => sum + region.population, 0);
  // Estimate total usage as sum of (population * avgUsage)
  const totalUsage = regionalData.reduce((sum, region) => sum + (region.population * region.avgUsage), 0);
  // Average usage per household
  const averageUsage = Math.round(totalUsage / totalHouseholds);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Government Analytics</h1>
          <p className="text-gray-600 mt-1">City-wide water management and policy insights</p>
        </div>
        <div className="flex gap-3 mt-4 lg:mt-0">
          <Button>
            <BarChart3 className="w-4 h-4 mr-2" />
            Policy Report
          </Button>
          <Button variant="outline">
            <Home className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">City-wide Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHouseholds.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across 5 districts</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">Conservation Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsage.toLocaleString()}L</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">Active Programs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageUsage}L</div>
            <p className="text-xs text-muted-foreground">Per household/month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-rose-500 to-rose-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">Budget Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R2.1M</div>
            <p className="text-xs opacity-75 mt-1">Infrastructure costs saved</p>
          </CardContent>
        </Card>
      </div>

      {/* Policy Impact Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Policy Impact Analysis</CardTitle>
          <CardDescription>Monthly consumption vs targets and conservation percentage</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={policyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'conservation') return [`${value}%`, 'Conservation Rate'];
                  // Ensure value is a number for arithmetic
                  const numValue = typeof value === 'number' ? value : Number(value);
                  return [`${(numValue / 1000000).toFixed(1)}M L`, name === 'consumption' ? 'Actual Usage' : 'Target'];
                }}
              />
              <Bar yAxisId="left" dataKey="consumption" fill="#0ea5e9" name="consumption" />
              <Bar yAxisId="left" dataKey="target" fill="#06b6d4" name="target" opacity={0.7} />
              <Line yAxisId="right" type="monotone" dataKey="conservation" stroke="#10b981" strokeWidth={3} name="conservation" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Usage Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionalData.map((region, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{region.region} Region</div>
                    <div className="text-sm text-gray-500">{region.population.toLocaleString()} residents</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{region.avgUsage}L/day</div>
                    <Badge variant={region.trend.startsWith('+') ? 'destructive' : 'default'}>
                      {region.trend}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usage Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Conservation Programs</CardTitle>
            <CardDescription>Active initiatives and their impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conservationPrograms.map((program, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="font-medium text-sm mb-2">{program.program}</div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      {program.participants.toLocaleString()} participants
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {program.savings}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      {/* Policy Recommendations */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-indigo-800">📊 Policy Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
              <h4 className="font-medium text-blue-800">Expand Smart Meter Program</h4>
              <p className="text-sm text-gray-600 mt-1">Deploy 15,000 additional smart meters in high-usage areas to achieve 12% additional savings.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border-l-4 border-green-500">
              <h4 className="font-medium text-green-800">Tiered Pricing Structure</h4>
              <p className="text-sm text-gray-600 mt-1">Implement progressive pricing to incentivize conservation in high-consumption households.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border-l-4 border-purple-500">
              <h4 className="font-medium text-purple-800">Industrial Partnerships</h4>
              <p className="text-sm text-gray-600 mt-1">Expand industrial efficiency program to cover 200+ more facilities for 25M L/month savings.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Privacy Notice */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>All personal data is anonymized and aggregated in compliance with privacy regulations.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
