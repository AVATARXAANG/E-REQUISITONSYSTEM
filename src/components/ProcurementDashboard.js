import React, { useState } from 'react';

const ProcurementDashboard = ({ approvedRequests, onProcessRequisition }) => {
  const [selectedRequisition, setSelectedRequisition] = useState(null);
  const [processedItems, setProcessedItems] = useState([]);

  // Open popup and initialize processed items state
  const handleOpenPopup = (req) => {
    setSelectedRequisition(req);
    setProcessedItems(
      req.items.map(item => ({
        id: item.id,
        itemDescription: item.itemDescription,
        quantityRequired: item.quantityRequired,
        quantityIssued: '', // Initial empty value for quantity issued
        outOfStock: false // Initial checkbox state
      }))
    );
  };

  // Close popup
  const handleClosePopup = () => {
    setSelectedRequisition(null);
    setProcessedItems([]);
  };

  // Handle changes to quantity issued
  const handleQuantityIssuedChange = (id, value) => {
    setProcessedItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantityIssued: value } : item
      )
    );
  };

  // Handle checkbox change for out of stock
  const handleOutOfStockChange = (id) => {
    setProcessedItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, outOfStock: !item.outOfStock } : item
      )
    );
  };

  // Process the requisition with updated data
  const handleProcess = () => {
    const updatedRequisition = {
      ...selectedRequisition,
      items: processedItems.map(item => ({
        id: item.id,
        itemDescription: item.itemDescription,
        quantityRequired: item.quantityRequired,
        quantityIssued: item.quantityIssued ? parseInt(item.quantityIssued, 10) : 0,
        outOfStock: item.outOfStock
      }))
    };
    onProcessRequisition(updatedRequisition);
    handleClosePopup(); // Close the popup after processing
  };

  return (
    <div 
      style={{
        backgroundColor: '#f0f8ff',
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
              key={req.serialNumber || index}
              style={{
                backgroundColor: 'white',
                padding: '15px',
                marginBottom: '15px',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                borderLeft: '4px solid #2196F3'
              }}
            >
              <h3 
                style={{
                  color: '#2196F3',
                  margin: '0 0 10px 0'
                }}
              >
                Requisition S11: {req.serialNumber}
              </h3>
              <h4 
                style={{
                  color: '#2196F3',
                  margin: '0 0 10px 0'
                }}
              >
                Department: {req.department}
              </h4>
              {req.items.map((item, itemIndex) => (
                <div key={item.id || itemIndex} style={{ marginBottom: '10px' }}>
                  <p style={{ margin: '5px 0' }}>{itemIndex + 1}. {item.itemDescription}</p>
                  <p style={{ margin: '5px 0' }}>Quantity Required: {item.quantityRequired}</p>
                </div>
              ))}
              <button 
                onClick={() => handleOpenPopup(req)}
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

      {/* Popup */}
      {selectedRequisition && (
        <div 
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            maxWidth: '500px',
            width: '90%'
          }}
        >
          <h3>Requisition S11: {selectedRequisition.serialNumber}</h3>
          <h4>Department: {selectedRequisition.department}</h4>
          {processedItems.map((item, index) => (
            <div key={item.id} style={{ marginBottom: '10px' }}>
              <p>{index + 1}. {item.itemDescription}</p>
              <p>Quantity Required: {item.quantityRequired}</p>
              <label style={{ display: 'block', margin: '5px 0' }}>
                Quantity Issued:
                <input
                  type="number"
                  value={item.quantityIssued}
                  onChange={(e) => handleQuantityIssuedChange(item.id, e.target.value)}
                  min="0"
                  style={{ width: '80px', marginLeft: '10px' }}
                />
              </label>
              <label style={{ display: 'block', margin: '5px 0' }}>
                Out of Stock:
                <input
                  type="checkbox"
                  checked={item.outOfStock}
                  onChange={() => handleOutOfStockChange(item.id)}
                  style={{ marginLeft: '10px' }}
                />
              </label>
            </div>
          ))}
          <div style={{ textAlign: 'center' }}>
            <button 
              onClick={handleProcess}
              style={{
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                marginRight: '10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Process
            </button>
            <button 
              onClick={handleClosePopup}
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
              Cancel
            </button>
          </div>
        </div>
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
          Procurement * Requisition * Forwarder
        </footer>
      </div>
    </div>
  );
};

export default ProcurementDashboard;