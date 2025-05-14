import React, { useState } from 'react';
import { Table, Select, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const LeadsTable = () => {
  const [assignments, setAssignments] = useState({});
  const [hoveredKey, setHoveredKey] = useState(null);
  const navigate = useNavigate();

  const handleAssign = (key) => {
    console.log(`Assigned ${assignments[key]} to lead with key ${key}`);
  };

  const handleChange = (value, key) => {
    setAssignments({ ...assignments, [key]: value });
  };

  const availableUsers = ['John Doe', 'Anna Smith', 'Vikram Joshi', 'Grace Kimani', 'Lukas Bauer'];

  const data = [
    {
      key: '1',
      clientName: 'Nancy Davolio',
      contact: '+1-202-555-0101',
      city: 'Seattle',
      state: 'Washington',
      assignedTo: 'John Doe',
      date: '2025-05-01',
      leadId: 'LD001',
      status: 'New',
    },
    {
      key: '2',
      clientName: 'Iulia Albu',
      contact: '+40-123-456-789',
      city: 'Bucharest',
      state: 'Romania',
      assignedTo: 'Anna Smith',
      date: '2025-05-01',
      leadId: 'LD002',
      status: 'Contacted',
    },
    // ... more data
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'clientName',
      key: 'clientName',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Assigned To',
      key: 'assignedTo',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Select
            defaultValue={record.assignedTo}
            style={{ width: 150 }}
            onChange={(value) => handleChange(value, record.key)}
          >
            {availableUsers.map((user) => (
              <Option key={user} value={user}>
                {user}
              </Option>
            ))}
          </Select>
          <Button
            onMouseEnter={() => setHoveredKey(record.key)}
            onMouseLeave={() => setHoveredKey(null)}
            onClick={() => handleAssign(record.key)}
            style={{
              border: '1px solid #1890ff',
              color: hoveredKey === record.key ? '#fff' : '#1890ff',
              backgroundColor: hoveredKey === record.key ? '#1890ff' : '#fff',
              transition: 'all 0.3s',
            }}
          >
            Assign
          </Button>
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
