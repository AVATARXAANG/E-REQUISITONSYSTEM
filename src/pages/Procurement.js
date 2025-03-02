import React from 'react';
import ProcurementDashboard from '../components/ProcurementDashboard';

const Procurement = ({ approvedRequests, processedRequests, onProcessed }) => {
  const handleProcessRequisition = (requisition) => {
    if (onProcessed) {
      onProcessed(requisition);
    }
  };

  return (
    <div>
      <h1>Procurement Dashboard</h1>
      <ProcurementDashboard 
        approvedRequests={approvedRequests}
        processedRequests={processedRequests} // Pass processedRequests
        onProcessRequisition={handleProcessRequisition}
      />
    </div>
  );
};

export default Procurement;

