import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SubmitRequisition from './pages/Submitrq';
import ApprovalDashboard from './pages/Approvaldash';
import Procurement from './pages/Procurement';
import './ProcurementDashboard.css';
import './loginForm.css';

function App() {
  const [user, setUser] = useState(null);
  const [requisitions, setRequisitions] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [processedRequests, setProcessedRequests] = useState([]);

  const handleLogin = (credentials) => {
    let role = 'Requestor';
    if (credentials.username === 'manager') {
      role = 'manager';
    } else if (credentials.username === 'procurement') {
      role = 'procurement';
    }
    setUser({ name: credentials.username, role: role });
  };

  const handleSubmit = (data) => {
    setRequisitions(prev => [...prev, { ...data, status: 'Pending' }]);
  };

  const handleApprove = (requisition) => {
    setApprovedRequests(prev => [...prev, { ...requisition, status: 'Approved' }]);
    setRequisitions(prev => prev.filter(r => r.serialNumber !== requisition.serialNumber));
  };

  const handleReject = (requisition) => {
    setRequisitions(prev => prev.filter(r => r.serialNumber !== requisition.serialNumber));
  };

  const handleProcessRequisition = (requisition) => {
    if (processedRequests.some(proc => proc.serialNumber === requisition.serialNumber)) {
      return;
    }
    setProcessedRequests(prev => [...prev, { ...requisition, status: 'Processed' }]);
    setApprovedRequests(prev => prev.filter(req => req.serialNumber !== requisition.serialNumber));
    setRequisitions(prev => prev.filter(req => req.serialNumber !== requisition.serialNumber));
  };

  const pendingRequisitions = requisitions.filter(req => 
    !processedRequests.some(proc => proc.serialNumber === req.serialNumber)
  );

  const activeApprovedRequests = approvedRequests.filter(req => 
    !processedRequests.some(proc => proc.serialNumber === req.serialNumber)
  );

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {user ? (
              <>
                {user.role === 'Requestor' && <li><Link to="/submit-requisition">Submit Requisition</Link></li>}
                {user.role === 'manager' && <li><Link to="/approval-dashboard">Approval Dashboard</Link></li>}
                {user.role === 'procurement' && <li><Link to="/procurement">Procurement Dashboard</Link></li>}
                <li><Link to="/login" onClick={() => setUser(null)}>Logout</Link></li>}
              </>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={
            user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
          } />
          <Route path="/submit-requisition" element={
            user && user.role === 'Requestor' ? 
              <SubmitRequisition onSubmit={handleSubmit} /> 
            : 
              <Navigate to="/" replace />
          } />
          <Route path="/approval-dashboard" element={
            user && user.role === 'manager' ? (
              <ApprovalDashboard 
                requisitions={pendingRequisitions} 
                onApprove={handleApprove} 
                onReject={handleReject} 
              />
            ) : (
              <Navigate to="/" replace />
            )
          } />
          <Route path="/procurement" element={
            user && user.role === 'procurement' ? (
              <Procurement 
                approvedRequests={activeApprovedRequests} 
                processedRequests={processedRequests} // Pass processedRequests
                onProcessed={handleProcessRequisition} // Renamed for clarity
              />
            ) : (
              <Navigate to="/" replace />
            )
          } />
          <Route path="/" element={
            user ? <h1>Welcome, {user.name}!</h1> : <Navigate to="/login" replace />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;