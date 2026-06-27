import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, CalendarCheck, Users, Truck, BarChart3,
  LogOut, Menu, X, Bus,
} from 'lucide-react';

const NAV = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/bookings', icon: CalendarCheck, label: 'Bookings' },
  { to: '/drivers', icon: Users, label: 'Drivers' },
  { to: '/fleet', icon: Truck, label: 'Fleet' },
  { to: '/revenue', icon: BarChart3, label: 'Revenue' },
];

interface Props { onLogout: () => void; }

export default function Layout({ onLogout }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => { onLogout(); navigate('/login'); };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#1E3A5F] flex flex-col
        transform transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
            <Bus className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-xl">travo</p>
            <p className="text-white/60 text-xs">Admin Dashboard</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-orange-500 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white text-sm font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm text-gray-600">Admin</span>
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-orange-600 text-sm font-bold">A</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
