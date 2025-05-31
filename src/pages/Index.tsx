
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { HomeownerDashboard } from '@/components/HomeownerDashboard';
import { AdminDashboard } from '@/components/AdminDashboard';
import { GovernmentDashboard } from '@/components/GovernmentDashboard';

const Index = () => {
  const [userRole, setUserRole] = useState<'homeowner' | 'admin' | 'government'>('homeowner');

  const renderDashboard = () => {
    switch (userRole) {
      case 'homeowner':
        return <HomeownerDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'government':
        return <GovernmentDashboard />;
      default:
        return <HomeownerDashboard />;
    }
  };

  return (
    <Layout userRole={userRole} onRoleChange={setUserRole}>
      {renderDashboard()}
    </Layout>
  );
};

export default Index;
