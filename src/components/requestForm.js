import React, { useState } from 'react';

const RequisitionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    department: '',
    itemDescription: '',
    quantityRequired: ''
  });
  const [items, setItems] = useState([]); // List of items without serialNumber

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    // Check if all required fields are filled before adding
    if (formData.department && formData.itemDescription && formData.quantityRequired) {
      setItems(prevItems => [
        ...prevItems,
        { id: Date.now(), itemDescription: formData.itemDescription, quantityRequired: formData.quantityRequired }
      ]);
      // Clear only itemDescription and quantityRequired, leaving department unchanged
      setFormData(prevState => ({
        ...prevState,
        itemDescription: '',
        quantityRequired: ''
      }));
    }
  };

  const handleRemoveItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate unique S11 number for the entire requisition
    const serialNumber = `S11-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    // Submit the requisition with all items and a single serialNumber
    if (items.length > 0) {
      const requisition = {
        serialNumber,
        department: formData.department, // Include department at requisition level
        items
      };
      onSubmit(requisition);
      setItems([]); // Clear the list after submission
      setFormData({
        department: '',
        itemDescription: '',
        quantityRequired: ''
      }); // Reset all fields, including department, after submission
    }
  };

  return (
    <div>
      <form onSubmit={handleAddProduct}>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
          disabled={items.length > 0} // Disable department selection after first item is added
        >
          <option value="" disabled>Select Department</option>
          <option value="Theatre">Theatre</option>
          <option value="Male Ward">Male Ward</option>
          <option value="Female Ward">Female Ward</option>
        </select>
        <input
          type="text"
          name="itemDescription"
          value={formData.itemDescription}
          onChange={handleChange}
          placeholder="Item Description"
          required
        />
        <input
          type="number"
          name="quantityRequired"
          value={formData.quantityRequired}
          onChange={handleChange}
          placeholder="Quantity Required"
          required
        />
        <button type="submit">Add Product</button>
      </form>

      {/* Display added items */}
      {items.length > 0 && (
        <div>
          <h3>Added Items</h3>
          <h3>Department: {formData.department}</h3> {/* Show department as heading */}
          <ul>
            {items.map((item, index) => (
              <li key={item.id}>
                {index + 1}. {item.itemDescription} - Qty: {item.quantityRequired}
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={handleSubmit}>Submit Requisition</button>
        </div>
      )}
    </div>
  );
};

export default RequisitionForm;