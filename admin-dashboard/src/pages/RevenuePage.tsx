import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MONTHLY = [
  { month: 'Jan', revenue: 48000, bookings: 312, drivers: 28 },
  { month: 'Feb', revenue: 52000, bookings: 338, drivers: 30 },
  { month: 'Mar', revenue: 61000, bookings: 410, drivers: 32 },
  { month: 'Apr', revenue: 58000, bookings: 385, drivers: 31 },
  { month: 'May', revenue: 74000, bookings: 482, drivers: 35 },
  { month: 'Jun', revenue: 82000, bookings: 541, drivers: 38 },
];

const VEHICLE_REVENUE = [
  { vehicle: 'TT 9-seat', revenue: 31200, share: 38 },
  { vehicle: 'TT 12-seat', revenue: 24600, share: 30 },
  { vehicle: 'Mini Bus', revenue: 16400, share: 20 },
  { vehicle: 'Full Bus', revenue: 9800, share: 12 },
];

export default function RevenuePage() {
  const [period, setPeriod] = useState<'monthly' | 'weekly'>('monthly');
  const totalRevenue = MONTHLY.reduce((a, m) => a + m.revenue, 0);
  const totalBookings = MONTHLY.reduce((a, m) => a + m.bookings, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Revenue</h1>
        <p className="text-gray-500 mt-1">Financial performance overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard label="Total Revenue (2026)" value={`₹${(totalRevenue / 1000).toFixed(0)}K`} change="+18%" up />
        <KPICard label="This Month" value="₹82,000" change="+11%" up />
        <KPICard label="Total Bookings" value={totalBookings.toString()} change="+73%" up />
        <KPICard label="Avg. Fare" value="₹1,140" change="-2%" up={false} />
      </div>

      {/* Revenue Trend */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-gray-900">Revenue & Bookings Trend</h2>
          <div className="flex gap-2">
            {(['monthly', 'weekly'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors
                  ${period === p ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={MONTHLY}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v: number, name: string) => name === 'revenue' ? `₹${v.toLocaleString()}` : v} />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={2.5} dot={{ r: 4 }} name="Revenue" />
            <Line yAxisId="right" type="monotone" dataKey="bookings" stroke="#1E3A5F" strokeWidth={2} dot={{ r: 4 }} name="Bookings" strokeDasharray="4 2" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Vehicle Revenue Split */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-6">Revenue by Vehicle Type</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={VEHICLE_REVENUE} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis type="number" tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
              <YAxis type="category" dataKey="vehicle" tick={{ fontSize: 12 }} width={80} />
              <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#F97316" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-6">Revenue Share</h2>
          <div className="space-y-4">
            {VEHICLE_REVENUE.map((v) => (
              <div key={v.vehicle}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-700 font-medium">{v.vehicle}</span>
                  <span className="text-sm text-gray-500">₹{v.revenue.toLocaleString()} ({v.share}%)</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: `${v.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex justify-between">
              <span className="text-sm font-semibold text-gray-700">Total This Month</span>
              <span className="text-lg font-bold text-orange-500">₹82,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payouts */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-4">Recent Driver Payouts</h2>
        <table className="w-full">
          <thead className="text-xs text-gray-500 uppercase">
            <tr>
              <th className="py-2 text-left">Driver</th>
              <th className="py-2 text-left">Period</th>
              <th className="py-2 text-left">Trips</th>
              <th className="py-2 text-right">Amount</th>
              <th className="py-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[
              { driver: 'Rajan Kumar', period: 'Jun 21–27', trips: 22, amount: 8650, paid: true },
              { driver: 'Suresh Mohan', period: 'Jun 21–27', trips: 18, amount: 6800, paid: true },
              { driver: 'Mohan Das', period: 'Jun 21–27', trips: 31, amount: 12400, paid: false },
              { driver: 'Karthik S.', period: 'Jun 21–27', trips: 8, amount: 3200, paid: false },
            ].map((p) => (
              <tr key={p.driver}>
                <td className="py-3 text-sm font-medium text-gray-900">{p.driver}</td>
                <td className="py-3 text-sm text-gray-500">{p.period}</td>
                <td className="py-3 text-sm text-gray-600">{p.trips}</td>
                <td className="py-3 text-sm font-semibold text-gray-900 text-right">₹{p.amount.toLocaleString()}</td>
                <td className="py-3 text-right">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full
                    ${p.paid ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {p.paid ? 'Paid' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function KPICard({ label, value, change, up }: { label: string; value: string; change: string; up: boolean }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <p className="text-sm text-gray-500 mb-2">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
      <div className={`flex items-center gap-1 text-sm font-medium ${up ? 'text-green-600' : 'text-red-500'}`}>
        {up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        {change} vs last period
      </div>
    </div>
  );
}
