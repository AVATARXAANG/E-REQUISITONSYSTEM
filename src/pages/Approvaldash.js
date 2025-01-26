import React from 'react';
import Approval from '../components/Approval';

const ApprovalDashboard = ({ requisitions, onApprove, onReject }) => (
  <div>
    <h1>Approval Dashboard</h1>
    {requisitions.map((req, index) => (
      <Approval 
        key={index} 
        requisition={req} 
        onApprove={onApprove} 
        onReject={onReject} 
      />
    ))}
  </div>
);

export default ApprovalDashboard;