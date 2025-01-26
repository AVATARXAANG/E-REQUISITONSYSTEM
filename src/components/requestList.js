import React from 'react';

const ProcurementDashboard = ({ approvedRequests }) => (
  <div className="ProcurementDashboard">
    <h2>Approved Requisitions</h2>
    {approvedRequests.map((req, index) => (
      <div key={index}>
        <h3>{req.itemName}</h3>
        <p>Quantity: {req.quantity}</p>
        <p>Justification: {req.justification}</p>
        <p>Budget Code: {req.budgetCode}</p>
      </div>
    ))}
  </div>
);

export default ProcurementDashboard;