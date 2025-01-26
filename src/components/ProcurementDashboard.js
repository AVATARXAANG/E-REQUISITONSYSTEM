import React from 'react';

const ProcurementDashboard = ({ approvedRequests, onProcessRequisition }) => (
  <div className="ProcurementDashboard">
    <h2>Approved Requisitions</h2>
    {Array.isArray(approvedRequests) ? (
      approvedRequests.length > 0 ? (
        approvedRequests.map((req, index) => (
          <div key={req.id || index} className="requisition-item">
            <h3>{req.itemName}</h3>
            <p>Unit price: {req.price}</p>
            <p>Quantity: {req.quantity}</p>
            <p>Justification: {req.justification}</p>
            <p>Total: {req.totalprice}</p>
            <p>Budget Code: {req.budgetCode}</p>
            <button onClick={() => onProcessRequisition(req)}>Process Requisition</button>
          </div>
        ))
      ) : (
        <p>No approved requisitions yet.</p>
      )
    ) : (
      <p>Loading requisitions...</p>
    )}
    <div>
      <footer>Procurement.Requisition.Forwarder</footer>
    </div>
  </div>
);

export default ProcurementDashboard;