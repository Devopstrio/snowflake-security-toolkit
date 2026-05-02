import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import SecurityDashboard from './pages/SecurityDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400">The Snowflake security engine is currently enforcing global policies and monitoring data access patterns. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<SecurityDashboard />} />
          <Route path="/roles" element={<Placeholder name="Snowflake Role Management" />} />
          <Route path="/masking" element={<Placeholder name="Dynamic Data Masking" />} />
          <Route path="/queries" element={<Placeholder name="Query Anomaly Monitoring" />} />
          <Route path="/policies" element={<Placeholder name="Strategic Policy Engine" />} />
          <Route path="/compliance" element={<Placeholder name="Regulatory Compliance Hub" />} />
          <Route path="/audit" element={<Placeholder name="Governance Audit Logs" />} />
          <Route path="/snowflake" element={<Placeholder name="Snowflake Integration Hub" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
