import React from 'react';
import ProcurementDashboard from '../components/ProcurementDashboard';

const Procurement = ({ approvedRequests }) => (
  <div>
    <h1>Procurement Dashboard</h1>
    <ProcurementDashboard approvedRequests={approvedRequests} />
  </div>
);

export default Procurement;