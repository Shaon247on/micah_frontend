"use client";

import { FileText, Clock, CheckCircle, Activity } from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import { DashboardData } from "@/types/dashboard";
import { useUser } from "@/context/UserContext";

const COLORS = ["#8f3e1b", "#c25e28", "#e89e7c", "#faece5", "#f5d5c4"];

interface DashboardOverviewProps { 
  data: DashboardData;
}

export default function DashboardOverview({
  data,
}: DashboardOverviewProps) {
    const {user} = useUser()
  const { stats, trafficData, serviceData, performanceData, cityData } = data;

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#121F37]">
          Dashboard Overview
        </h1>

        <p className="mt-1 text-sm text-[#6B6B6B]">
          Welcome back, {user?.name}. Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<FileText size={24} />}
          label="Total Appointments"
          value={formatNumber(stats.totalAppointments)}
        />

        <StatCard
          icon={<Clock size={24} />}
          label="Pending"
          value={formatNumber(stats.pendingAppointments)}
        />

        <StatCard
          icon={<Activity size={24} />}
          label="In Progress" // ✅ Now correctly shows IN_PROGRESS
          value={formatNumber(stats.inProgressAppointments)}
        />

        <StatCard
          icon={<CheckCircle size={24} />}
          label="Completed"
          value={formatNumber(stats.completedAppointments)}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Traffic Chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 xl:col-span-2">
          <h2 className="mb-6 text-base font-semibold text-[#121F37]">
            Appointment Traffic
          </h2>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient
                    id="colorVisitors"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#E07B3F" stopOpacity={0.8} />

                    <stop offset="95%" stopColor="#E07B3F" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E8EEF7"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B6B6B" }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B6B6B" }}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#E07B3F"
                  fillOpacity={1}
                  fill="url(#colorVisitors)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-6 text-base font-semibold text-[#121F37]">
            Appointments by Service
          </h2>

          <div className="flex h-[300px] items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {serviceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Bar Chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 xl:col-span-2">
          <h2 className="mb-6 text-base font-semibold text-[#121F37]">
            Weekly Appointment Performance
          </h2>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E8EEF7"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B6B6B" }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B6B6B" }}
                />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#E07B3F"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cities */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-6 text-base font-semibold text-[#121F37]">
            Top Service Cities
          </h2>

          <div className="flex flex-col gap-4">
            {cityData.length > 0 ? (
              cityData.map((item) => (
                <div
                  key={item.city}
                  className="flex items-center justify-between border-b border-gray-200 py-3 last:border-b-0"
                >
                  <span className="text-sm text-[#121F37]">{item.city}</span>

                  <span className="text-sm font-medium text-[#121F37]">
                    {item.count}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-[#6B6B6B]">No city data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex flex-col">
        <span className="mb-2 text-sm text-[#6B6B6B]">{label}</span>

        <span className="text-[28px] font-bold leading-none text-[#121F37]">
          {value}
        </span>
      </div>

      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#E07B3F]/10 text-[#E07B3F]">
        {icon}
      </div>
    </div>
  );
}
