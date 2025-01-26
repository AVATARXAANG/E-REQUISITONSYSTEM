import React from 'react';
import RequisitionForm from '../components/requestForm';

const SubmitRequisition = ({ onSubmit }) => (
  <div>
    <h1>Submit Requisition</h1>
    <RequisitionForm onSubmit={onSubmit} />
  </div>
);

export default SubmitRequisition;