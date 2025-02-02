import React from 'react';

const Approval = ({ requisition, onApprove, onReject }) => (
  <div className="Approval">
    <h3>{requisition.itemName}</h3>
    <p>Quantity: {requisition.quantity}</p>
    <p>Justification: {requisition.justification}</p>
    <p>Budget Code: {requisition.budgetCode}</p>
    <button 
      onClick={() => onApprove(requisition)}
      style={{
        backgroundColor: '#2196F3', // Inline style my button
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        marginRight: '10px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
      }}
    >
      Approve requisition
    </button>
    <button 
      onClick={() => onReject(requisition)}
      style={{
        backgroundColor: '#FF5722', 
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
      }}
    >
      Reject requisition
    </button>
  </div>
);

export default Approval;