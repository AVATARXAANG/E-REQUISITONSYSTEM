import React from 'react';

const ProcurementDashboard = ({ approvedRequests, onProcessRequisition }) => (
  <div 
    style={{
      backgroundColor: '#f0f8ff', // Light blue background for the dashboard
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif'
    }}
  >
    <h2 
      style={{
        color: '#2196F3', 
        marginBottom: '20px',
        textAlign: 'center'
      }}
    >
      Approved Requisitions
    </h2>
    {Array.isArray(approvedRequests) ? (
      approvedRequests.length > 0 ? (
        approvedRequests.map((req, index) => (
          <div 
            key={req.id || index}
            style={{
              backgroundColor: 'white',
              padding: '15px',
              marginBottom: '15px',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
              borderLeft: '4px solid #2196F3' //card-like effect
            }}
          >
            <h3 
              style={{
                color: '#2196F3',
                margin: '0 0 10px 0'
              }}
            >
              {req.itemName}
            </h3>
            <p style={{ margin: '5px 0' }}>Unit price: {req.price}</p>
            <p style={{ margin: '5px 0' }}>Quantity: {req.quantity}</p>
            <p style={{ margin: '5px 0' }}>Justification: {req.justification}</p>
            <p style={{ margin: '5px 0' }}>Total: {req.totalprice}</p>
            <p style={{ margin: '5px 0' }}>Budget Code: {req.budgetCode}</p>
            <button 
              onClick={() => onProcessRequisition(req)}
              style={{
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                marginTop: '10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Process Requisition
            </button>
          </div>
        ))
      ) : (
        <p>No approved requisitions yet.</p>
      )
    ) : (
      <p>Loading requisitions...</p>
    )}
    <div 
      style={{
        marginTop: '20px',
        textAlign: 'center'
      }}
    >
      <footer 
        style={{
          color: '#2196F3',
          fontSize: '12px'
        }}
      >
        Procurement.Requisition.Forwarder
      </footer>
    </div>
  </div>
);

export default ProcurementDashboard;