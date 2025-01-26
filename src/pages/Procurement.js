import React, { useState } from 'react';
import ProcurementDashboard from '../components/ProcurementDashboard';

const Procurement = ({ approvedRequests }) => {
  const [processedRequests, setProcessedRequests] = useState([]);

  // Handler for processing a requisition
  const handleProcessRequisition = (requisition) => {
    // For now, we'll just log the requisition and move it to processedRequests
    console.log('Processing requisition:', requisition);
    setProcessedRequests(prev => [...prev, { ...requisition, status: 'Processed' }]);
  };
  return (
    <div>
      <h1>Procurement Dashboard</h1>
      <ProcurementDashboard 
        approvedRequests={approvedRequests} 
        onProcessRequisition={handleProcessRequisition}
      />
    </div>
  );
};

export default Procurement;