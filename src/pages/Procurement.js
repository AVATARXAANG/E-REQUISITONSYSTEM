import React, { useState } from 'react';
import ProcurementDashboard from '../components/ProcurementDashboard';

const Procurement = ({ approvedRequests, onProcessed }) => {
  const [processedRequests, setProcessedRequests] = useState([]);

  // Handler for processing a requisition
  const handleProcessRequisition = (requisition) => {
    // Add to processed requests with updated status
    setProcessedRequests(prev => [...prev, { ...requisition, status: 'Processed' }]);
    // Notify parent to remove from approvedRequests
    if (onProcessed) {
      onProcessed(requisition.serialNumber);
    }
  };

  return (
    <div>
      <h1>Procurement Dashboard</h1>
      <ProcurementDashboard 
        approvedRequests={approvedRequests} 
        onProcessRequisition={handleProcessRequisition}
      />
      {processedRequests.length > 0 && (
        <div>
          <h2>Processed Requisitions</h2>
          <ul>
            {processedRequests.map(req => (
              <li key={req.serialNumber}>
                Requisition S11: {req.serialNumber} - Processed
                <ul>
                  {req.items.map((item, index) => (
                    <li key={item.id || index}>
                      {item.itemDescription} - Qty Issued: {item.quantityIssued} 
                      {item.outOfStock ? ' (Out of Stock)' : ''}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Procurement;