/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LeadDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const leadData = location.state?.leadData;
  const [followUps, setFollowUps] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [documentTitle, setDocumentTitle] = useState('');
  const [documentDescription, setDocumentDescription] = useState('');

  const fetchDocuments = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/document/lead/${leadData.lead_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setDocuments(res.data.data || []);
      })
      .catch((err) => {
        console.error('Failed to fetch documents:', err);
        setDocuments([]);
      });
  };
  // Fetch existing follow-ups
  useEffect(() => {
    if (leadData?.lead_id) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/followup/lead/${leadData.lead_id}`, {
          withCredentials: true,
        })
        .then((res) => {
          const formatted = res.data.follow_ups.map((f) => ({
            note: f.conclusion || '',
            date: f.next_followup_date?.slice(0, 10) || '',
          }));
          setFollowUps(formatted);
        })
        .catch((err) => {
          console.error('Failed to fetch follow-ups:', err);
          setFollowUps([]);
        });

      // Fetch documents related to this lead
      fetchDocuments();
    }
  }, [leadData?.lead_id]);

  const handleFollowUpChange = (index, field, value) => {
    const updated = [...followUps];
    updated[index] = { ...updated[index], [field]: value };
    setFollowUps(updated);
  };

  const handleAddFollowUp = () => {
    setFollowUps([...followUps, { note: '', date: '' }]);
  };

  const changeStatus = (new_staus) => {
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/api/lead/${leadData.lead_id}`, {
        status: new_staus, // Send the status in the request body
      })
      .then((response) => {
        console.log('Status updated successfully:');
        // Optionally update UI or state here
      })
      .catch((error) => {
        console.error('Error updating status:', error);
      });
  };

  const handleSaveFollowUp = (index) => {
    const followUp = followUps[index];
    const payload = {
      user_id: leadData.user_id,
      followup_count: index + 1,
      lead_id: leadData.lead_id,
      conclusion: followUp.note,
      next_followup_date: followUp.date,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/followup`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        alert('Follow-up added successfully');
      })
      .catch((err) => {
        console.error(err);
        alert('Something went wrong while saving the follow-up.');
      });
  };

  const uploadDocument = (file) => {
    setIsUploading(true);

    const formData = new FormData();
    formData.append('document', file);
    formData.append('lead_id', leadData.lead_id);
    formData.append('doc_name', documentTitle);
    formData.append('doc_desc', documentDescription);
    // formData.append('uploaded_by', leadData.user_id);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/document/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then((res) => {
        alert('Document uploaded successfully');
        setDocumentTitle('');
        setDocumentDescription('');
        fetchDocuments(); // Refresh the documents list
      })
      .catch((err) => {
        console.error('Error uploading document:', err);
        alert('Failed to upload document');
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  const handleFileChange = (e) => {
    if (!e.target.files[0]) return;

    const file = e.target.files[0];
    if (!documentTitle.trim()) {
      alert('Please enter a document title before uploading');
      return;
    }

    uploadDocument(file);
  };

  const handleDeleteDocument = (documentId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      axios
        .delete(`${process.env.REACT_APP_BASE_URL}/api/document/${documentId}`, {
          withCredentials: true,
        })
        .then(() => {
          alert('Document deleted successfully');
          fetchDocuments(); // Refresh the documents list
        })
        .catch((err) => {
          console.error('Error deleting document:', err);
          alert('Failed to delete document');
        });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!leadData) return <div>No lead data provided.</div>;

  return (
    <div
      className="lead-detail-container"
      style={{
        maxWidth: '800px',
        margin: '40px auto',
        padding: '30px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '24px',
          fontWeight: '600',
          color: '#333',
        }}
      >
        Lead Details
      </h2>

      {/* Lead Information Card */}
      <div
        style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          padding: '20px',
          marginBottom: '30px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            marginBottom: '10px',
          }}
        >
          <div>
            <span style={{ fontWeight: '600', color: '#555' }}>Client Name:</span>
            <span style={{ marginLeft: '8px' }}>{leadData.client}</span>
          </div>
          <div>
            <span style={{ fontWeight: '600', color: '#555' }}>Date:</span>
            <span style={{ marginLeft: '8px' }}>{leadData.date}</span>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            marginBottom: '10px',
          }}
        >
          <div>
            <span style={{ fontWeight: '600', color: '#555' }}>Lead ID:</span>
            <span style={{ marginLeft: '8px' }}>{leadData.leadId}</span>
          </div>
          <div>
            <span style={{ fontWeight: '600', color: '#555' }}>Status:</span>
            <span
              style={{
                marginLeft: '8px',
                backgroundColor:
                  leadData.status === 'Active'
                    ? '#fff3cd'
                    : leadData.status === 'Converted'
                      ? '#d4edda'
                      : leadData.status === 'Close'
                        ? '#f8d7da'
                        : '#e2e3e5',
                color:
                  leadData.status === 'Active'
                    ? '#856404'
                    : leadData.status === 'Converted'
                      ? '#155724'
                      : leadData.status === 'Close'
                        ? '#721c24'
                        : '#383d41',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              {leadData.status}
            </span>
          </div>
        </div>

        <div>
          <span style={{ fontWeight: '600', color: '#555' }}>Assigned To: {leadData.empID}</span>
          {/* <span style={{ marginLeft: '8px' }}>Employee ID: {leadData.user_id}</span> */}
        </div>
      </div>

      {/* Documents Section */}
      <div style={{ marginBottom: '30px' }}>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '15px',
            borderBottom: '1px solid #eee',
            paddingBottom: '10px',
          }}
        >
          Documents
        </h3>

        <div style={{ display: 'flex', marginBottom: '20px', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1' }}>
            <label
              style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px' }}
            >
              Document Title: <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              placeholder="Enter document title"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          </div>

          <div style={{ flex: '1' }}>
            <label
              style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px' }}
            >
              Document Description: <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              value={documentDescription}
              onChange={(e) => setDocumentDescription(e.target.value)}
              placeholder="Enter document description"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
              required
            />
          </div>

          <div style={{ flex: '1' }}>
            <label
              style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px' }}
            >
              Upload File: <span style={{ color: 'red' }}>*</span>
              <input
                type="file"
                onChange={handleFileChange}
                style={{
                  width: '100%',
                  padding: '7px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: '#f8f9fa',
                }}
                disabled={isUploading || !documentTitle.trim()}
              />
            </label>
          </div>
        </div>

        {/* Documents Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                <th style={{ padding: '12px 15px', textAlign: 'left', fontSize: '14px' }}>
                  Document ID
                </th>
                <th style={{ padding: '12px 15px', textAlign: 'left', fontSize: '14px' }}>
                  File Name
                </th>
                <th style={{ padding: '12px 15px', textAlign: 'left', fontSize: '14px' }}>
                  Description
                </th>
                {/* <th style={{ padding: '12px 15px', textAlign: 'left', fontSize: '14px' }}>
                  Uploaded By
                </th> */}
                {/* <th style={{ padding: '12px 15px', textAlign: 'left', fontSize: '14px' }}>
                  Upload Date
                </th> */}
                <th style={{ padding: '12px 15px', textAlign: 'center', fontSize: '14px' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {documents.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{ padding: '15px', textAlign: 'center', color: '#6c757d' }}
                  >
                    No documents uploaded yet.
                  </td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr key={doc.documet_id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '10px 15px' }}>{doc.documet_id}</td>
                    <td style={{ padding: '10px 15px' }}>{doc.doc_name || '-'}</td>
                    <td style={{ padding: '10px 15px' }}>{doc.doc_desc}</td>
                    {/* <td style={{ padding: '10px 15px' }}>ID: {doc.uploaded_by}</td>
                    <td style={{ padding: '10px 15px' }}>
                      {new Date(doc.upload_date).toLocaleDateString()}
                    </td> */}
                    <td style={{ padding: '10px 15px', textAlign: 'center' }}>
                      <a
                        href={`${process.env.REACT_APP_BASE_URL}/public/${doc.doc_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          backgroundColor: '#17a2b8',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '5px 10px',
                          marginRight: '5px',
                          cursor: 'pointer',
                          fontSize: '13px',
                        }}
                      >
                        View
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDeleteDocument(doc.documet_id)}
                        style={{
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '5px 10px',
                          cursor: 'pointer',
                          fontSize: '13px',
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Follow-ups Section */}
      <div style={{ marginBottom: '30px' }}>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '15px',
            borderBottom: '1px solid #eee',
            paddingBottom: '10px',
          }}
        >
          Follow-ups
        </h3>

        {followUps.length === 0 && (
          <p
            style={{
              marginBottom: '20px',
              color: '#6c757d',
              padding: '10px',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          >
            No follow-ups recorded for this lead yet.
          </p>
        )}

        {followUps.map((followUp, index) => (
          <form
            key={index}
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveFollowUp(index);
            }}
            style={{
              marginBottom: '15px',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <div style={{ flex: '2', minWidth: '250px' }}>
                <label
                  htmlFor={`followup-${index}`}
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: '500',
                    fontSize: '14px',
                  }}
                >
                  Follow Up-{index + 1}:
                </label>
                <input
                  type="text"
                  id={`followup-${index}`}
                  value={followUp.note}
                  onChange={(e) => handleFollowUpChange(index, 'note', e.target.value)}
                  placeholder="Enter follow-up note"
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '14px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
              </div>

              <div style={{ flex: '1', minWidth: '180px' }}>
                <label
                  htmlFor={`nextfollowup-${index}`}
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: '500',
                    fontSize: '14px',
                  }}
                >
                  Next Follow-up Date:
                  <input
                    type="date"
                    id={`nextfollowup-${index}`}
                    value={followUp.date}
                    onChange={(e) => handleFollowUpChange(index, 'date', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      fontSize: '14px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  />
                </label>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button
                  type="submit"
                  style={{
                    padding: '10px 14px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    height: '41px',
                    fontSize: '14px',
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        ))}

        <button
          type="button"
          onClick={handleAddFollowUp}
          style={{
            padding: '8px 16px',
            backgroundColor: '#17a2b8',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ marginRight: '5px' }}>+</span> Add Follow-Up
        </button>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px', gap: '15px' }}>
        <button
          type="button"
          onClick={handleBack}
          style={{
            padding: '10px 18px',
            backgroundColor: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => changeStatus('Converted')}
          style={{
            padding: '10px 18px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Convert to Customer
        </button>
        <button
          type="button"
          onClick={() => changeStatus('Close')}
          style={{
            padding: '10px 18px',
            backgroundColor: '#EE2800FF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Close Lead
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          style={{
            padding: '10px 18px',
            backgroundColor: '#2414FFFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Print Report
        </button>
      </div>
    </div>
  );
};

export default LeadDetail;
