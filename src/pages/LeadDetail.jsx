import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LeadDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const leadData = location.state?.leadData;

  const [followUps, setFollowUps] = useState(['', '', '']);

  const handleFollowUpChange = (index, value) => {
    const updated = [...followUps];
    updated[index] = value;
    setFollowUps(updated);
  };

  const handleAddFollowUp = (index) => {
    console.log(`Follow UP-${index + 1}:`, followUps[index]);
  };

  const handleBack = () => {
    navigate(-1); // 👈 goes back
  };

  if (!leadData) return <div>No lead data provided.</div>;

  return (
    <div style={{ maxWidth: '700px', margin: '60px auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '26px' }}>Lead Detail Page</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
        <div><strong>Client Name:</strong> {leadData.clientName}</div>
        <div><strong>Date:</strong> {leadData.date}</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '35px' }}>
        <div><strong>Lead ID:</strong> {leadData.leadId}</div>
        <div><strong>Status:</strong> {leadData.status}</div>
      </div>

      {followUps.map((val, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
          <label style={{ width: '120px', fontWeight: 'bold' }}>Follow UP-{index + 1}:</label>
          <input
            type="text"
            value={val}
            onChange={(e) => handleFollowUpChange(index, e.target.value)}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '15px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginRight: '12px'
            }}
          />
          <button
            onClick={() => handleAddFollowUp(index)}
            style={{
              padding: '12px 16px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Add Follow UP
          </button>
        </div>
      ))}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '50px' }}>
        <button
          onClick={handleBack}
          style={{
            padding: '12px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '12px'
          }}
        >
          Back
        </button>
        <button
          onClick={() => console.log('All follow-ups submitted', followUps)}
          style={{
            padding: '12px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Follow UP
        </button>
      </div>
    </div>
  );
};

export default LeadDetail;
