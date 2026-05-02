import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  Shield, 
  Users, 
  EyeOff, 
  Activity,
  ArrowUpRight,
  TrendingDown,
  Clock,
  Database,
  Lock,
  FileCheck,
  Target,
  Database as SnowflakeIcon,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

const accessTrends = [
  { name: '00:00', queries: 450, anomalies: 2 },
  { name: '04:00', queries: 320, anomalies: 1 },
  { name: '08:00', queries: 1200, anomalies: 15 },
  { name: '12:00', queries: 2100, anomalies: 45 },
  { name: '16:00', queries: 1800, anomalies: 30 },
  { name: '20:00', queries: 950, anomalies: 10 },
];

const KPI_CARDS = [
  { title: 'Active Roles', value: '142', trend: '+12%', color: 'sky', icon: Users },
  { title: 'Masking Coverage', value: '88%', trend: '+5%', color: 'sky', icon: EyeOff },
  { title: 'Anomalous Queries', value: '12', trend: 'High Risk', color: 'rose', icon: AlertTriangle },
  { title: 'Compliance Score', value: '94%', trend: 'Healthy', color: 'emerald', icon: FileCheck },
];

const SecurityDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Snowflake Security Command</h1>
          <p className="text-slate-400">Strategic oversight of data governance, access controls, and query monitoring.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Compliance Report
          </button>
          <button className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Enforce Global Policy
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-${card.color === 'rose' ? 'rose' : card.color === 'emerald' ? 'emerald' : 'sky'}-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-${card.color === 'rose' ? 'rose' : card.color === 'emerald' ? 'emerald' : 'sky'}-400`} />
              </div>
              <div className={`text-xs font-medium ${card.trend.includes('High') ? 'text-rose-400' : 'text-emerald-400'}`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Access Trend Graph */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Query Activity & Anomalies (24h)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={accessTrends}>
                <defs>
                  <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="queries" stroke="#0ea5e9" fill="url(#colorQueries)" name="Total Queries" />
                <Area type="monotone" dataKey="anomalies" stroke="#f43f5e" fill="transparent" strokeDasharray="5 5" name="Anomalies" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Classification Profile */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Data Sensitivity Profile</h3>
          <div className="flex-1 space-y-6">
            {[
              { name: 'PII (Masked)', value: 45, color: 'bg-rose-500' },
              { name: 'Sensitive (Encrypted)', value: 35, color: 'bg-amber-500' },
              { name: 'Public (Restricted)', value: 20, color: 'bg-sky-500' },
            ].map((profile) => (
              <div key={profile.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{profile.name}</span>
                  <span className="text-slate-400">{profile.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${profile.color}`} style={{ width: `${profile.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Masking Policies Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Active Data Masking Policies</h3>
          <button className="text-sky-400 hover:text-sky-300 text-sm font-medium">View All Policies</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Policy Name</th>
                <th className="px-6 py-4 font-semibold">Data Type</th>
                <th className="px-6 py-4 font-semibold">Allowed Roles</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { name: 'PII_MASK_EMAIL', type: 'EMAIL', roles: 'PII_ADMIN, SYSADMIN', status: 'ACTIVE' },
                { name: 'SENSITIVE_COST_HIDE', type: 'FINANCIAL', roles: 'FIN_ADMIN', status: 'ACTIVE' },
                { name: 'ADDR_OBFUSCATION', type: 'LOCATION', roles: 'GEO_ADMIN', status: 'STAGING' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <EyeOff className="w-4 h-4 text-sky-400" />
                      <span className="text-sm font-medium text-slate-300">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{row.type}</td>
                  <td className="px-6 py-4 text-xs text-slate-300">{row.roles}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${
                      row.status === 'ACTIVE' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : 
                      'text-amber-400 border-amber-500/20 bg-amber-500/10'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sky-400 hover:text-sky-300 text-xs font-bold uppercase tracking-wider">
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;
