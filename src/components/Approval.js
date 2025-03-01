import React, { useState } from 'react';

const Approval = ({ requisition, onApprove, onReject }) => {
  // Initialize quantities state with the original requisition items
  const [quantities, setQuantities] = useState(
    requisition.items.map(item => ({
      id: item.id,
      quantityRequired: item.quantityRequired
    }))
  );

  // Handle quantity change for each item
  const handleQuantityChange = (id, newQuantity) => {
    setQuantities(prevQuantities =>
      prevQuantities.map(qty =>
        qty.id === id ? { ...qty, quantityRequired: newQuantity } : qty
      )
    );
  };

  // Handle approval with updated quantities
  const handleApprove = () => {
    console.log('Approving requisition:', requisition); // Debug log to check requisition
    const updatedItems = requisition.items.map(item => {
      const updatedQty = quantities.find(qty => qty.id === item.id)?.quantityRequired || item.quantityRequired;
      return {
        ...item,
        quantityRequired: updatedQty // Ensure quantityRequired is updated
      };
    });
    const updatedRequisition = {
      ...requisition,
      items: updatedItems
    };
    console.log('Updated requisition:', updatedRequisition); // Debug log to verify updated data
    onApprove(updatedRequisition); // Call the onApprove function with updated requisition
  };

  return (
    <div className="Approval">
      <h3>Requisition S11: {requisition.serialNumber}</h3>
      <h4>Department: {requisition.department}</h4>
      {requisition.items.map((item, index) => (
        <div key={item.id || index} className="requisition-item">
          <h5>Item {index + 1}: {item.itemDescription}</h5>
          <label>
            Quantity Required:
            <input
              type="number"
              value={quantities.find(qty => qty.id === item.id)?.quantityRequired || item.quantityRequired}
              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              min="0"
            />
          </label>
        </div>
      ))}
      <button 
        onClick={handleApprove}
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
        Approve Requisition
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
        Reject Requisition
      </button>
    </div>
  );
};

export default Approval;