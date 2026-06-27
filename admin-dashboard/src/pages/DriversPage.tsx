import React, { useState } from 'react';
import { Search, Star, Phone, MapPin } from 'lucide-react';

const DRIVERS = [
  { id: 'D001', name: 'Rajan Kumar', phone: '+91 98765 43210', vehicle: 'TT 9 · KA 04 AB 1234', rating: 4.8, trips: 342, earnings: '₹1,240', status: 'online', location: 'Indiranagar' },
  { id: 'D002', name: 'Suresh Mohan', phone: '+91 87654 32109', vehicle: 'TT 12 · KA 05 CD 5678', rating: 4.6, trips: 218, earnings: '₹980', status: 'busy', location: 'Whitefield' },
  { id: 'D003', name: 'Mohan Das', phone: '+91 76543 21098', vehicle: 'TT 12 · KA 01 EF 9012', rating: 4.9, trips: 501, earnings: '₹2,100', status: 'online', location: 'Koramangala' },
  { id: 'D004', name: 'Preethi Nair', phone: '+91 65432 10987', vehicle: 'Mini Bus · KA 09 GH 3456', rating: 4.7, trips: 156, earnings: '₹0', status: 'offline', location: 'Last seen: JP Nagar' },
  { id: 'D005', name: 'Venkat Rao', phone: '+91 54321 09876', vehicle: 'TT 9 · KA 03 IJ 7890', rating: 4.5, trips: 89, earnings: '₹540', status: 'online', location: 'MG Road' },
  { id: 'D006', name: 'Karthik S.', phone: '+91 43210 98765', vehicle: 'Full Bus · KA 07 KL 2345', rating: 4.8, trips: 278, earnings: '₹3,800', status: 'busy', location: 'Electronic City' },
];

const STATUS_CFG: Record<string, { dot: string; bg: string; text: string; label: string }> = {
  online: { dot: 'bg-green-500', bg: 'bg-green-100', text: 'text-green-700', label: 'Online' },
  busy: { dot: 'bg-yellow-500', bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'On Trip' },
  offline: { dot: 'bg-gray-400', bg: 'bg-gray-100', text: 'text-gray-600', label: 'Offline' },
};

export default function DriversPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = DRIVERS.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.vehicle.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || d.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = { online: DRIVERS.filter(d => d.status === 'online').length, busy: DRIVERS.filter(d => d.status === 'busy').length, offline: DRIVERS.filter(d => d.status === 'offline').length };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Drivers</h1>
          <p className="text-gray-500 mt-1">Manage your driver partner fleet</p>
        </div>
        <button className="btn-primary">+ Add Driver</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Online', value: counts.online, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'On Trip', value: counts.busy, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Offline', value: counts.offline, color: 'text-gray-600', bg: 'bg-gray-50' },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl p-5 text-center ${s.bg}`}>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or vehicle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none text-sm"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'online', 'busy', 'offline'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-sm font-medium capitalize transition-colors
                ${filter === f ? 'bg-[#1E3A5F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Driver Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((d) => {
          const s = STATUS_CFG[d.status];
          return (
            <div key={d.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#1E3A5F]/10 flex items-center justify-center text-[#1E3A5F] font-bold text-lg">
                    {d.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{d.name}</p>
                    <p className="text-xs text-gray-500">{d.id}</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${s.bg} ${s.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                  {s.label}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-3.5 h-3.5" />
                  {d.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-3.5 h-3.5" />
                  {d.location}
                </div>
                <p className="text-sm text-gray-500 font-medium">{d.vehicle}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-gray-900">{d.rating}</span>
                  <span className="text-xs text-gray-500">({d.trips} trips)</span>
                </div>
                <span className="text-sm font-bold text-green-600">{d.earnings} today</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
