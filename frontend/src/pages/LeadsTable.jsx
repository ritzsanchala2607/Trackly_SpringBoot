/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Table, Select, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

const LeadsTable = () => {
  const [assignments, setAssignments] = useState({});
  const [hoveredKey, setHoveredKey] = useState(null);
  const [employee, setEmployee] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([{}]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleAssign = (leadId) => {
    const emp_id = assignments[leadId];

    const leadRecord = data.find((lead) => lead.leadId === leadId);
    if (!leadRecord) {
      alert('Lead data not found.');
      return;
    }

    // Construct full payload with existing data + updates
    const updatedLead = {
      ...leadRecord,
      empID: emp_id,
    };

    console.log(updatedLead);

    axios
      .put(`${process.env.REACT_APP_BASE_URL}/api/lead/${leadId}`, updatedLead, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        alert(`Lead ${leadId} assigned successfully`);
      })
      .catch((err) => {
        console.error('Error assigning lead:', err);
        alert('Failed to assign employee to lead.');
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/user/get-employees`)
      .then((res) => {
        setEmployee(res.data);

        // Extract only names
        const names = res.data.map((emp) => ({
          name: emp.username,
          id: emp.id,
        }));
        setAvailableUsers(names);
      })
      .catch((err) => {
        console.error('Error fetching employees', err);
      });

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/lead/unassigned`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error('Error fetching employees', err);
      });
  }, []);

  const handleChange = (value, key) => {
    setAssignments({ ...assignments, [key]: value });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'leadId',
      key: 'leadId',
    },
    {
      title: 'Client Name',
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: 'Contact Number',
      dataIndex: 'contact_number',
      key: 'contact_number',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'emial',
    },
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
    },
    // {
    //   title: 'Date',
    //   dataIndex: 'date',
    //   key: 'date',
    // },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: 'Assigned To',
      key: 'assignedTo',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {record.emp_name === null ? (
            <>
              <Select
                defaultValue={assignments[record.leadId] || null}
                style={{ width: 150 }}
                placeholder="Select user"
                onChange={(value) => handleChange(value, record.leadId)}
              >
                {availableUsers.map((user) => (
                  <Option key={user.id} value={user.id}>
                    {user.name}
                  </Option>
                ))}
              </Select>
              <Button
                onMouseEnter={() => setHoveredKey(record.leadId)}
                onMouseLeave={() => setHoveredKey(null)}
                onClick={() => handleAssign(record.leadId)}
                style={{
                  border: '1px solid #1890ff',
                  color: hoveredKey === record.leadId ? '#fff' : '#1890ff',
                  backgroundColor: hoveredKey === record.leadId ? '#1890ff' : '#fff',
                  transition: 'all 0.3s',
                }}
              >
                Assign
              </Button>
            </>
          ) : (
            <span>
              {availableUsers.find((user) => user.id === record.user_id)?.name || record.user_id}
            </span>
          )}
        </div>
      ),
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="default"
          onClick={() => navigate('/leaddetails', { state: { leadData: record } })}
        >
          Check Details
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} bordered />
    </div>
  );
};

export default LeadsTable;
