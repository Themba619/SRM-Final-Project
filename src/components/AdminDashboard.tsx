import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { BarChart3, Settings } from "lucide-react";

// South african provinces
const aggregatedData = [
  { area: "Gauteng", usage: 15420, alerts: 3, efficiency: 78 },
  { area: "Limpopo", usage: 18900, alerts: 7, efficiency: 65 },
  { area: "Mpumalanga", usage: 12300, alerts: 1, efficiency: 85 },
  { area: "North West", usage: 21500, alerts: 12, efficiency: 58 },
  { area: "Free State", usage: 16800, alerts: 5, efficiency: 72 },
  { area: "Eastern Cape", usage: 14200, alerts: 4, efficiency: 74 },
  { area: "KwaZulu-Natal", usage: 20100, alerts: 9, efficiency: 69 },
  { area: "Northern Cape", usage: 9800, alerts: 2, efficiency: 81 },
  { area: "Western Cape", usage: 17600, alerts: 6, efficiency: 77 },
];

const hourlySystemData = [
  { hour: "00", usage: 1200, peak: false },
  { hour: "06", usage: 3500, peak: false },
  { hour: "12", usage: 8900, peak: true },
  { hour: "18", usage: 12400, peak: true },
  { hour: "21", usage: 6800, peak: false },
  { hour: "24", usage: 2100, peak: false },
];

const reportData = [
  {
    id: "001",
    address: "Block 123, Taman Jurong",
    meterCode: "TJ-001-2025",
    reading: "15420L",
    timestamp: "2025-05-31 14:30",
    status: "normal",
  },
  {
    id: "002",
    address: "Block 456, Ang Mo Kio",
    meterCode: "AMK-002-2025",
    reading: "28950L",
    timestamp: "2025-05-31 14:25",
    status: "high",
  },
  {
    id: "003",
    address: "Block 789, Bedok",
    meterCode: "BDK-003-2025",
    reading: "12350L",
    timestamp: "2025-05-31 14:20",
    status: "normal",
  },
];

export function AdminDashboard() {
  const [selectedDistrict, setSelectedDistrict] = useState("all");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Monitor system-wide water usage and manage alerts
          </p>
        </div>
        <div className="flex gap-3 mt-4 lg:mt-0">
          <Button
            onClick={() => {
              // Generate CSV from aggregatedData
              const csv =
                "Province,Usage (L),Alerts,Efficiency (%)\n" +
                aggregatedData
                  .map(
                    (row) =>
                      `${row.area},${row.usage},${row.alerts},${row.efficiency}`
                  )
                  .join("\n");
              const blob = new Blob([csv], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "district-usage-report.csv";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select
              value={selectedDistrict}
              onValueChange={setSelectedDistrict}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                <SelectItem value="Gauteng">Gauteng</SelectItem>
                <SelectItem value="Limpopo">Limpopo</SelectItem>
                <SelectItem value="Mpumalanga">Mpumalanga</SelectItem>
                <SelectItem value="North West">North West</SelectItem>
                <SelectItem value="Free State">Free State</SelectItem>
                <SelectItem value="Eastern Cape">Eastern Cape</SelectItem>
                <SelectItem value="KwaZulu-Natal">KwaZulu-Natal</SelectItem>
                <SelectItem value="Northern Cape">Northern Cape</SelectItem>
                <SelectItem value="Western Cape">Western Cape</SelectItem>
              </SelectContent>
            </Select>

            <Input type="date" className="w-full" defaultValue="2025-05-31" />

            <Select defaultValue="today">
              <SelectTrigger>
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full">
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">
              Total Usage Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84,920L</div>
            <p className="text-xs opacity-75 mt-1">Across all districts</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs opacity-75 mt-1">High usage warnings</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">
              Connected Meters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs opacity-75 mt-1">98.5% online</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">
              Avg Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">71.6%</div>
            <p className="text-xs opacity-75 mt-1">System-wide score</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly System Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Hourly System Usage</CardTitle>
            <CardDescription>Peak demand tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={hourlySystemData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value}L`, "Total Usage"]}
                  labelFormatter={(label) => `${label}:00`}
                />
                <Area
                  type="monotone"
                  dataKey="usage"
                  stroke="#0ea5e9"
                  fill="#0ea5e9"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* District Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>District Usage Comparison</CardTitle>
            <CardDescription>
              Daily consumption by area — Provinces: Gauteng, Limpopo,
              Mpumalanga, North West, Free State, Eastern Cape, KwaZulu-Natal,
              Northern Cape, Western Cape
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={aggregatedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}L`, "Usage"]} />
                <Bar dataKey="usage" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* District Overview Table */}
      <Card>
        <CardHeader>
          <CardTitle>District Overview</CardTitle>
          <CardDescription>Aggregated statistics by area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">District</th>
                  <th className="text-left py-3 px-4">Total Usage</th>
                  <th className="text-left py-3 px-4">Active Alerts</th>
                  <th className="text-left py-3 px-4">Efficiency Score</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {aggregatedData.map((district, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{district.area}</td>
                    <td className="py-3 px-4">
                      {district.usage.toLocaleString()}L
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          district.alerts > 5 ? "destructive" : "secondary"
                        }
                      >
                        {district.alerts} alerts
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-green-500 rounded-full"
                            style={{ width: `${district.efficiency}%` }}
                          />
                        </div>
                        <span className="text-sm">{district.efficiency}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          district.efficiency > 70 ? "default" : "secondary"
                        }
                      >
                        {district.efficiency > 70 ? "Good" : "Needs Attention"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Meter Readings</CardTitle>
          <CardDescription>
            Latest automated reports from field devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportData.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="font-medium">{report.address}</div>
                  <div className="text-sm text-gray-500">
                    Meter: {report.meterCode}
                  </div>
                  <div className="text-xs text-gray-400">
                    {report.timestamp}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{report.reading}</div>
                  <Badge
                    variant={
                      report.status === "high" ? "destructive" : "default"
                    }
                  >
                    {report.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
