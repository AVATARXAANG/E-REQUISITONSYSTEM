import React, { useState } from 'react';

const RequisitionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    price:'',
    totalprice:'',
    justification: '',
    budgetCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ Department: '', itemName: '', quantity: '', price:'', totalprice:'', justification: '', budgetCode: '' });
  };

  return (
    //request form
    <form onSubmit={handleSubmit}>
      <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} placeholder="Item Name" required />
      <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" required />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Estimated unit price" required />
      <input type="number" name="totalprice" value={formData.totalprice} onChange={handleChange} placeholder="Total" required />
      <textarea name="justification" value={formData.justification} onChange={handleChange} placeholder="Justification" required />
      <input type="text" name="budgetCode" value={formData.budgetCode} onChange={handleChange} placeholder="Budget Code" required />
      <button type="submit">Submit Requisition</button>
    </form>
  );
};

export default RequisitionForm;