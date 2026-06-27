import React, { useState } from 'react';
import { Search, Filter, Eye, Phone } from 'lucide-react';

const ALL_BOOKINGS = [
  { id: 'BK1024', passenger: 'Aditya P.', phone: '+91 98765 43210', pickup: 'Indiranagar', drop: 'Whitefield', vehicle: 'TT 9-seat', driver: 'Rajan K.', fare: 840, rideType: 'now', status: 'active', date: 'Jun 27, 10:30 AM' },
  { id: 'BK1023', passenger: 'Priya S.', phone: '+91 87654 32109', pickup: 'MG Road', drop: 'Airport', vehicle: 'TT 12-seat', driver: 'Suresh M.', fare: 1200, rideType: 'now', status: 'completed', date: 'Jun 27, 8:00 AM' },
  { id: 'BK1022', passenger: 'Rahul M.', phone: '+91 76543 21098', pickup: 'Koramangala', drop: 'Mysore', vehicle: 'Mini Bus', driver: 'Pending', fare: 4500, rideType: 'schedule', status: 'scheduled', date: 'Jun 28, 6:00 AM' },
  { id: 'BK1021', passenger: 'Sneha K.', phone: '+91 65432 10987', pickup: 'JP Nagar', drop: 'Hosur', vehicle: 'TT 9-seat', driver: 'N/A', fare: 620, rideType: 'now', status: 'cancelled', date: 'Jun 26, 3:00 PM' },
  { id: 'BK1020', passenger: 'Kiran T.', phone: '+91 54321 09876', pickup: 'Hebbal', drop: 'Electronic City', vehicle: 'TT 12-seat', driver: 'Mohan D.', fare: 980, rideType: 'now', status: 'completed', date: 'Jun 26, 11:00 AM' },
  { id: 'BK1019', passenger: 'Meera R.', phone: '+91 43210 98765', pickup: 'Marathahalli', drop: 'Tumkur', vehicle: 'Full Bus', driver: 'Pending', fare: 8500, rideType: 'schedule', status: 'scheduled', date: 'Jun 30, 5:00 AM' },
];

const STATUS_CFG: Record<string, { bg: string; text: string }> = {
  active: { bg: 'bg-blue-100', text: 'text-blue-700' },
  completed: { bg: 'bg-green-100', text: 'text-green-700' },
  scheduled: { bg: 'bg-orange-100', text: 'text-orange-700' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700' },
};

export default function BookingsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = ALL_BOOKINGS.filter((b) => {
    const matchSearch = b.passenger.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.pickup.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <p className="text-gray-500 mt-1">Manage all ride bookings</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Today', value: '72', color: 'text-gray-900' },
          { label: 'Active', value: '18', color: 'text-blue-600' },
          { label: 'Scheduled', value: '14', color: 'text-orange-600' },
          { label: 'Cancelled', value: '4', color: 'text-red-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by passenger, booking ID, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none text-sm"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'scheduled', 'completed', 'cancelled'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors capitalize
                  ${statusFilter === s ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Passenger</th>
                <th className="px-6 py-3 text-left">Route</th>
                <th className="px-6 py-3 text-left">Vehicle</th>
                <th className="px-6 py-3 text-left">Driver</th>
                <th className="px-6 py-3 text-left">Fare</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((b) => {
                const s = STATUS_CFG[b.status];
                return (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">{b.id}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{b.passenger}</p>
                      <p className="text-xs text-gray-500">{b.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {b.pickup} → {b.drop}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{b.vehicle}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{b.driver}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{b.fare.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${b.rideType === 'schedule' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                        {b.rideType === 'schedule' ? 'Scheduled' : 'Instant'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${s.bg} ${s.text}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{b.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">No bookings found</div>
          )}
        </div>
      </div>
    </div>
  );
}
