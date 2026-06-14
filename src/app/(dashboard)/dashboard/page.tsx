'use client';

import {
  Users,
  FileText,
  MessageSquare,
  Wrench,
} from 'lucide-react';

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
} from 'recharts';

const trafficData = [
  { name: 'Jan', visitors: 3000 },
  { name: 'Feb', visitors: 2800 },
  { name: 'Mar', visitors: 3200 },
  { name: 'Apr', visitors: 9000 },
  { name: 'May', visitors: 5000 },
  { name: 'Jun', visitors: 6000 },
  { name: 'Jul', visitors: 3000 },
  { name: 'Aug', visitors: 5500 },
  { name: 'Sep', visitors: 4900 },
  { name: 'Oct', visitors: 6500 },
  { name: 'Nov', visitors: 6000 },
  { name: 'Dec', visitors: 6500 },
];

const serviceData = [
  { name: 'AC Install', value: 40 },
  { name: 'Repair', value: 30 },
  { name: 'Maintenance', value: 20 },
  { name: 'Ducts', value: 10 },
];

const COLORS = ['#8f3e1b', '#c25e28', '#e89e7c', '#faece5'];

const performanceData = [
  { name: 'Week 1', value: 60 },
  { name: 'Week 2', value: 98 },
  { name: 'Week 3', value: 40 },
  { name: 'Week 4', value: 80 },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-main)]">
          Dashboard Overview
        </h1>

        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Welcome back, Sarah. Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Users size={24} />}
          label="Total Visitors"
          value="48,392"
        />

        <StatCard
          icon={<FileText size={24} />}
          label="Quote Requests"
          value="1,284"
        />

        <StatCard
          icon={<MessageSquare size={24} />}
          label="Messages"
          value="376"
        />

        <StatCard
          icon={<Wrench size={24} />}
          label="Active Services"
          value="12"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Traffic Chart */}
        <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 xl:col-span-2">
          <h2 className="mb-6 text-base font-semibold text-[var(--color-text-main)]">
            Visitor Traffic
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
                    <stop
                      offset="5%"
                      stopColor="var(--color-primary)"
                      stopOpacity={0.8}
                    />

                    <stop
                      offset="95%"
                      stopColor="var(--color-primary)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--color-border)"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--color-text-muted)' }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--color-text-muted)' }}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="var(--color-primary)"
                  fillOpacity={1}
                  fill="url(#colorVisitors)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
          <h2 className="mb-6 text-base font-semibold text-[var(--color-text-main)]">
            Inquiries by Service
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
        <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 xl:col-span-2">
          <h2 className="mb-6 text-base font-semibold text-[var(--color-text-main)]">
            Monthly Quote Performance
          </h2>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--color-border)"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--color-text-muted)' }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--color-text-muted)' }}
                />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="var(--color-primary)"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cities */}
        <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
          <h2 className="mb-6 text-base font-semibold text-[var(--color-text-main)]">
            Top Visitors City
          </h2>

          <div className="flex flex-col gap-4">
            {[
              { city: 'Joliet', count: 450 },
              { city: 'Plainfield', count: 156 },
              { city: 'Shorewood', count: 79 },
              { city: 'Romeoville', count: 35 },
              { city: 'Crest Hill', count: 12 },
            ].map((item) => (
              <div
                key={item.city}
                className="flex items-center justify-between border-b border-[var(--color-border)] py-3 last:border-b-0"
              >
                <span className="text-sm text-[var(--color-text-main)]">
                  {item.city}
                </span>

                <span className="text-sm font-medium text-[var(--color-text-main)]">
                  {item.count}
                </span>
              </div>
            ))}
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
    <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-white p-6">
      <div className="flex flex-col">
        <span className="mb-2 text-sm text-[var(--color-text-muted)]">
          {label}
        </span>

        <span className="text-[28px] font-bold leading-none text-[var(--color-text-main)]">
          {value}
        </span>
      </div>

      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[var(--color-primary-light)] text-[var(--color-primary)]">
        {icon}
      </div>
    </div>
  );
}