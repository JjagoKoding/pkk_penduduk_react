import React, { useState } from 'react';
import {
  GaugeCircle,
  Users,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  BarChart3,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Users2,
  Building2,
  UserPlus,
  UserCheck,
  UserCog
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isUsersDropdownOpen, setIsUsersDropdownOpen] = useState(false);

  const stats = [
    { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', isPositive: true, icon: DollarSign },
    { title: 'Active Users', value: '2,345', change: '+15.2%', isPositive: true, icon: Users2 },
    { title: 'Conversion Rate', value: '3.2%', change: '-2.1%', isPositive: false, icon: BarChart3 },
  ];

  const chartData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
  ];

  const userSubMenu = [
    { icon: UserPlus, label: 'Add User', id: 'users-add' },
    { icon: UserCheck, label: 'Manage Users', id: 'users-manage' },
    { icon: UserCog, label: 'User Settings', id: 'users-settings' },
  ];

  const navigation = [
    { icon: GaugeCircle, label: 'Dashboard', id: 'dashboard' },
    { 
      icon: Users, 
      label: 'Users', 
      id: 'users',
      hasSubmenu: true,
      submenu: userSubMenu
    },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  const renderNavigationItem = (item) => {
    if (item.hasSubmenu) {
      return (
        <div key={item.id} className="space-y-1">
          <button
            onClick={() => setIsUsersDropdownOpen(!isUsersDropdownOpen)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors
              ${activeTab === item.id ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="w-5 h-5 stroke-[1.5]" />
              {isSidebarOpen && <span className="font-medium tracking-wide">{item.label}</span>}
            </div>
            {isSidebarOpen && (
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isUsersDropdownOpen ? 'rotate-180' : ''}`} />
            )}
          </button>
          
          <div className={`overflow-hidden transition-all duration-200 ease-in-out ${isUsersDropdownOpen ? 'max-h-48' : 'max-h-0'}`}>
            <div className={`pl-4 space-y-1 ${!isSidebarOpen && 'pl-0'}`}>
              {item.submenu.map((subItem) => (
                <button
                  key={subItem.id}
                  onClick={() => setActiveTab(subItem.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors
                    ${activeTab === subItem.id ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <subItem.icon className="w-5 h-5 stroke-[1.5]" />
                  {isSidebarOpen && <span className="font-medium tracking-wide">{subItem.label}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <button
        key={item.id}
        onClick={() => setActiveTab(item.id)}
        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors
          ${activeTab === item.id ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
      >
        <item.icon className="w-5 h-5 stroke-[1.5]" />
        {isSidebarOpen && <span className="font-medium tracking-wide">{item.label}</span>}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-800/50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-white w-64 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Building2 className="w-6 h-6 text-blue-600 stroke-[1.5]" />
            <h1 className="font-semibold text-xl tracking-wide">SIMDUK</h1>
          </div>
          <button 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500 stroke-[1.5]" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {navigation.map(item => renderNavigationItem(item))}
        </nav>
      </aside>

      {/* Desktop Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 hidden md:block fixed inset-y-0`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <div className={`flex items-center space-x-2 ${!isSidebarOpen && 'hidden'}`}>
            <Building2 className="w-6 h-6 text-blue-600 stroke-[1.5]" />
            <h1 className="font-semibold text-xl tracking-wide">SIMDUK</h1>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-5 h-5 text-gray-500 stroke-[1.5]" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {navigation.map(item => renderNavigationItem(item))}
        </nav>
      </aside>

      <div className={`transition-all duration-300 ${isSidebarOpen ? 'md:pl-64' : 'md:pl-20'}`}>
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-30">
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Menu className="w-5 h-5 text-gray-500 stroke-[1.5]" />
          </button>
          
          <div className="flex-1 px-4 max-w-2xl hidden sm:block">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 stroke-[1.5]" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 relative">
              <Bell className="w-5 h-5 text-gray-500 stroke-[1.5]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <ChevronDown className="w-4 h-4 text-gray-500 stroke-[1.5] hidden sm:block" />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 sm:p-6 lg:p-8">

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2 bg-gray-100 rounded-lg">
                    <stat.icon className="w-5 h-5 text-gray-700 stroke-[1.5]" />
                  </span>
                  <span className={`flex items-center space-x-1 text-sm ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.isPositive ? <ArrowUpRight className="w-4 h-4 stroke-[1.5]" /> : <ArrowDownRight className="w-4 h-4 stroke-[1.5]" />}
                    <span className="font-medium">{stat.change}</span>
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-500 tracking-wide">{stat.title}</h3>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900 mt-1 tracking-wide">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Chart Section */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6 sm:mb-8">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 tracking-wide">Revenue Overview</h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>


          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 tracking-wide">Recent Activity</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <img
                      src={`https://images.unsplash.com/photo-${1500000000000 + i}?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                      alt="User"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 tracking-wide truncate">User {i + 1}</p>
                      <p className="text-sm text-gray-500 truncate">Completed task #{i + 1}</p>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap">2h ago</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;