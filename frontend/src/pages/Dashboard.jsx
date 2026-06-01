import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Shield, User as UserIcon, Activity } from 'lucide-react';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ totalProducts: 0, totalUsers: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const prodRes = await api.get('/products');
        let userRes = { data: { count: 0 } };
        if (user.role === 'admin') {
          userRes = await api.get('/users');
        }
        setStats({
          totalProducts: prodRes.data.count,
          totalUsers: userRes.data.count,
        });
      } catch (error) {
        console.error('Failed to fetch stats');
      }
    };
    fetchStats();
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-500">Overview of your account and platform statistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
          <div className="p-4 bg-indigo-50 rounded-xl text-indigo-600">
            <UserIcon className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Profile</p>
            <p className="text-xl font-bold text-slate-900">{user?.name}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
          <div className="p-4 bg-blue-50 rounded-xl text-blue-600">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Access Level</p>
            <p className="text-xl font-bold text-slate-900 capitalize">{user?.role}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
          <div className="p-4 bg-emerald-50 rounded-xl text-emerald-600">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Products</p>
            <p className="text-xl font-bold text-slate-900">{stats.totalProducts}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
