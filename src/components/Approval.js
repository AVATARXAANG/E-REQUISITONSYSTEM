import React from 'react';

const Approval = ({ requisition, onApprove, onReject }) => (
  <div className="Approval">
    <h3>{requisition.itemName}</h3>
    <p>Quantity: {requisition.quantity}</p>
    <p>Justification: {requisition.justification}</p>
    <p>Budget Code: {requisition.budgetCode}</p>
    <button onClick={() => onApprove(requisition)}>Approve requisition</button>
    <button onClick={() => onReject(requisition)}>Reject requisition</button>
  </div>
);

export default Approval;