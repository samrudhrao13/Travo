import React, { useState } from 'react';
import { Truck, Users, Activity } from 'lucide-react';

const FLEET = [
  { id: 'V001', type: 'TT 9-seat', reg: 'KA 04 AB 1234', driver: 'Rajan Kumar', seats: 9, status: 'on_trip', fuel: 72, lastService: 'Jun 15', nextService: 'Jul 15', trips: 342 },
  { id: 'V002', type: 'TT 12-seat', reg: 'KA 05 CD 5678', driver: 'Suresh Mohan', seats: 12, status: 'on_trip', fuel: 45, lastService: 'Jun 10', nextService: 'Jul 10', trips: 218 },
  { id: 'V003', type: 'TT 12-seat', reg: 'KA 01 EF 9012', driver: 'Mohan Das', seats: 12, status: 'available', fuel: 90, lastService: 'Jun 20', nextService: 'Jul 20', trips: 501 },
  { id: 'V004', type: 'Mini Bus', reg: 'KA 09 GH 3456', driver: 'Preethi Nair', seats: 20, status: 'idle', fuel: 30, lastService: 'May 28', nextService: 'Jun 28', trips: 156 },
  { id: 'V005', type: 'TT 9-seat', reg: 'KA 03 IJ 7890', driver: 'Venkat Rao', seats: 9, status: 'available', fuel: 65, lastService: 'Jun 12', nextService: 'Jul 12', trips: 89 },
  { id: 'V006', type: 'Full Bus', reg: 'KA 07 KL 2345', driver: 'Karthik S.', seats: 45, status: 'maintenance', fuel: 20, lastService: 'Jun 1', nextService: 'Jun 30', trips: 278 },
  { id: 'V007', type: 'TT 9-seat', reg: 'KA 02 MN 6789', driver: 'Unassigned', seats: 9, status: 'idle', fuel: 88, lastService: 'Jun 18', nextService: 'Jul 18', trips: 0 },
];

const STATUS_CFG: Record<string, { bg: string; text: string; label: string }> = {
  on_trip: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'On Trip' },
  available: { bg: 'bg-green-100', text: 'text-green-700', label: 'Available' },
  idle: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Idle' },
  maintenance: { bg: 'bg-red-100', text: 'text-red-700', label: 'Maintenance' },
};

export default function FleetPage() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? FLEET : FLEET.filter((v) => v.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fleet Management</h1>
          <p className="text-gray-500 mt-1">Track and manage all vehicles</p>
        </div>
        <button className="btn-primary">+ Add Vehicle</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Vehicles', value: FLEET.length, color: 'text-gray-900' },
          { label: 'On Trip', value: FLEET.filter(v => v.status === 'on_trip').length, color: 'text-blue-600' },
          { label: 'Available', value: FLEET.filter(v => v.status === 'available').length, color: 'text-green-600' },
          { label: 'Maintenance', value: FLEET.filter(v => v.status === 'maintenance').length, color: 'text-red-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'on_trip', 'available', 'idle', 'maintenance'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors
              ${filter === f ? 'bg-[#1E3A5F] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
          >
            {f.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Vehicle</th>
                <th className="px-6 py-3 text-left">Reg. Number</th>
                <th className="px-6 py-3 text-left">Driver</th>
                <th className="px-6 py-3 text-left">Seats</th>
                <th className="px-6 py-3 text-left">Fuel</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Total Trips</th>
                <th className="px-6 py-3 text-left">Next Service</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((v) => {
                const s = STATUS_CFG[v.status];
                const fuelColor = v.fuel < 30 ? 'bg-red-500' : v.fuel < 60 ? 'bg-yellow-400' : 'bg-green-500';
                return (
                  <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#1E3A5F]/10 flex items-center justify-center">
                          <Truck className="w-5 h-5 text-[#1E3A5F]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{v.type}</p>
                          <p className="text-xs text-gray-400">{v.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-700">{v.reg}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{v.driver}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Users className="w-3.5 h-3.5" />
                        {v.seats}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${fuelColor}`} style={{ width: `${v.fuel}%` }} />
                        </div>
                        <span className="text-xs text-gray-500">{v.fuel}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${s.bg} ${s.text}`}>{s.label}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{v.trips}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{v.nextService}</td>
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
