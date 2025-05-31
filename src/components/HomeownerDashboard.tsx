
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const dailyUsageData = [
  { time: '6AM', usage: 45 },
  { time: '9AM', usage: 120 },
  { time: '12PM', usage: 80 },
  { time: '3PM', usage: 60 },
  { time: '6PM', usage: 150 },
  { time: '9PM', usage: 90 },
  { time: '12AM', usage: 30 },
];

const weeklyData = [
  { day: 'Mon', usage: 450 },
  { day: 'Tue', usage: 380 },
  { day: 'Wed', usage: 520 },
  { day: 'Thu', usage: 410 },
  { day: 'Fri', usage: 490 },
  { day: 'Sat', usage: 650 },
  { day: 'Sun', usage: 580 },
];

const neighborhoodData = [
  { name: 'Your Usage', value: 450, color: '#0ea5e9' },
  { name: 'Neighborhood Avg', value: 380, color: '#06b6d4' },
  { name: 'Efficient Goal', value: 300, color: '#10b981' },
];

export function HomeownerDashboard() {
  const [viewMode, setViewMode] = useState<'daily' | 'monthly'>('daily');
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Water Usage Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your daily consumption and save water</p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            15% reduction this month
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-water-500 to-water-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">Today's Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450L</div>
            <p className="text-xs opacity-75 mt-1">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-ocean-500 to-ocean-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,180L</div>
            <p className="text-xs opacity-75 mt-1">-8% from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">Monthly Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$23.50</div>
            <p className="text-xs opacity-75 mt-1">Compared to avg</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">Efficiency Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">77%</div>
            <p className="text-xs opacity-75 mt-1">Above neighborhood</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Today's Water Usage</CardTitle>
                <CardDescription>Hourly consumption patterns</CardDescription>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <Button
                  variant={viewMode === 'daily' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('daily')}
                >
                  Daily
                </Button>
                <Button
                  variant={viewMode === 'monthly' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('monthly')}
                >
                  Monthly
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip 
                  labelFormatter={(label) => `Time: ${label}`}
                  formatter={(value) => [`${value}L`, 'Usage']}
                />
                <Line 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#0ea5e9" 
                  strokeWidth={3}
                  dot={{ fill: '#0ea5e9' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Average */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Average</CardTitle>
            <CardDescription>Daily consumption over the week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}L`, 'Usage']} />
                <Bar dataKey="usage" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Neighborhood Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Neighborhood Comparison</CardTitle>
            <CardDescription>How you compare to your area</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={neighborhoodData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {neighborhoodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}L`, 'Usage']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {neighborhoodData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}L</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conservation Tips */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-green-800">💡 Conservation Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg">
              <h4 className="font-medium text-green-800">Peak Usage Alert</h4>
              <p className="text-sm text-gray-600 mt-1">Your highest usage is at 6PM. Consider shorter showers during this time.</p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h4 className="font-medium text-blue-800">Weekend Pattern</h4>
              <p className="text-sm text-gray-600 mt-1">Weekend usage is 25% higher. Try batch laundry and dishwashing.</p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h4 className="font-medium text-purple-800">Efficiency Goal</h4>
              <p className="text-sm text-gray-600 mt-1">Reduce 50L daily to reach the efficient goal and save $8/month.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
