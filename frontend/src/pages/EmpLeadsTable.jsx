import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmpLeadsTable = () => {
  const [token, setToken] = useState('');
  const [empId, setEmpID] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        // const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/get-token`, {
        //   withCredentials: true,
        // });

        // const freshToken = res.data.token;
        // setToken(freshToken);

        const userData = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/get-user`, {
          // headers: { Authorization: `Bearer ${freshToken}` }, // use freshToken here
          withCredentials: true,
        });

        setEmpID(userData.data.id);
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    if (!empId) console.log('No Emp ID'); // wait until empId is set

    const fetchLeads = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/lead/emp/${empId}`);
        console.log(res.data);
        setData(res.data);
      } catch (err) {
        console.error('Error fetching leads:', err);
      }
    };

    fetchLeads();
  }, [empId]); // <== This triggers once empId is updated

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
      key: 'email',
    },
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
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
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        bordered
        rowKey="leadId"
      />
    </div>
  );
};

export default EmpLeadsTable;
