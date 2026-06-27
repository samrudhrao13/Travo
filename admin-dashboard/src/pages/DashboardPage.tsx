import React from 'react';
import {
  TrendingUp, Users, Car, Calendar, Clock, CheckCircle, XCircle, Bus,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from 'recharts';

const BOOKINGS_TREND = [
  { day: 'Mon', bookings: 24 }, { day: 'Tue', bookings: 31 },
  { day: 'Wed', bookings: 28 }, { day: 'Thu', bookings: 42 },
  { day: 'Fri', bookings: 56 }, { day: 'Sat', bookings: 72 },
  { day: 'Sun', bookings: 48 },
];

const REVENUE_DATA = [
  { month: 'Jan', revenue: 48000 }, { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 61000 }, { month: 'Apr', revenue: 58000 },
  { month: 'May', revenue: 74000 }, { month: 'Jun', revenue: 82000 },
];

const VEHICLE_SPLIT = [
  { name: 'TT 9-seat', value: 45 },
  { name: 'TT 12-seat', value: 30 },
  { name: 'Mini Bus', value: 15 },
  { name: 'Full Bus', value: 10 },
];

const PIE_COLORS = ['#F97316', '#1E3A5F', '#10B981', '#F59E0B'];

const RECENT_BOOKINGS = [
  { id: 'BK1024', passenger: 'Aditya P.', route: 'Indiranagar → Whitefield', vehicle: 'TT 9', amount: '₹840', status: 'active', time: '10:30 AM' },
  { id: 'BK1023', passenger: 'Priya S.', route: 'MG Road → Airport', vehicle: 'TT 12', amount: '₹1,200', status: 'completed', time: '8:00 AM' },
  { id: 'BK1022', passenger: 'Rahul M.', route: 'Koramangala → Mysore', vehicle: 'Mini Bus', amount: '₹4,500', status: 'scheduled', time: 'Jun 28' },
  { id: 'BK1021', passenger: 'Sneha K.', route: 'JP Nagar → Hosur', vehicle: 'TT 9', amount: '₹620', status: 'cancelled', time: 'Yesterday' },
];

const STATUS_CONFIG: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Active' },
  completed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Completed' },
  scheduled: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Scheduled' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelled' },
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with Travo today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={<Calendar className="w-5 h-5" />} label="Today's Bookings" value="72" change="+12%" color="orange" />
        <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Today's Revenue" value="₹62,400" change="+8%" color="green" />
        <StatCard icon={<Users className="w-5 h-5" />} label="Active Drivers" value="34" change="+2" color="blue" />
        <StatCard icon={<Bus className="w-5 h-5" />} label="Vehicles on Trip" value="18" change="of 52 total" color="purple" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Bookings Trend */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">Bookings This Week</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={BOOKINGS_TREND}>
              <defs>
                <linearGradient id="bookGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="bookings" stroke="#F97316" strokeWidth={2} fill="url(#bookGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Vehicle Split */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">Bookings by Vehicle</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={VEHICLE_SPLIT} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value">
                {VEHICLE_SPLIT.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Legend iconType="circle" iconSize={10} />
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-4">Monthly Revenue (2026)</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={REVENUE_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
            <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
            <Bar dataKey="revenue" fill="#1E3A5F" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Recent Bookings</h2>
          <a href="/bookings" className="text-orange-500 text-sm font-semibold hover:underline">View all</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Booking ID</th>
                <th className="px-6 py-3 text-left">Passenger</th>
                <th className="px-6 py-3 text-left">Route</th>
                <th className="px-6 py-3 text-left">Vehicle</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {RECENT_BOOKINGS.map((b) => {
                const s = STATUS_CONFIG[b.status];
                return (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">{b.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{b.passenger}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{b.route}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{b.vehicle}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{b.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${s.bg} ${s.text}`}>
                        {s.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{b.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, change, color }: any) {
  const colorMap: Record<string, string> = {
    orange: 'bg-orange-100 text-orange-600',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
  };
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          {icon}
        </div>
        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">{change}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
