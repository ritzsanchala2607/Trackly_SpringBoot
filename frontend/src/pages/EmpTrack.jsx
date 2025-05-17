/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const EmpTrack = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/user/get_employees`)
      .then((res) => {
        setData(res.data.employees);
      })
      .catch((err) => {
        console.error('Error fetching employees', err);
      });
  }, []);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone No',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
    },
    {
      title: 'No Of Open Leads',
      dataIndex: 'No Of Open Leads',
      key: 'No Of Open Leads',
    },
    {
      title: 'No Of Closed Leads',
      dataIndex: 'No Of Close Leads',
      key: 'No Of Close Leads',
    },
  ];

  // const data = [
  //   {
  //     key: '1',
  //     'Emp ID': 'Nancy Davolio',
  //     'Emp Name': '+1-202-555-0101',
  //     'No Of Open Leads': '1',
  //     'No Of Close Leads': '2',
  //   },
  //   {
  //     key: '2',
  //     'Emp ID': 'Iulia Albu',
  //     'Emp Name': '+40-123-456-789',
  //     'No Of Open Leads': '1',
  //     'No Of Close Leads': '2',
  //   },
  //   {
  //     key: '3',
  //     'Emp ID': 'Omar Darobe',
  //     'Emp Name': '+91-9876543210',
  //     'No Of Open Leads': '1',
  //     'No Of Close Leads': '2',
  //   },
  //   {
  //     key: '4',
  //     'Emp ID': 'Nasimiyu Danai',
  //     'Emp Name': '+254-712-345678',
  //     'No Of Open Leads': '1',
  //     'No Of Close Leads': '2',
  //   },
  //   {
  //     key: '5',
  //     'Emp ID': 'Siegbert Gottfried',
  //     'Emp Name': '+49-30-123456',
  //     'No Of Open Leads': '1',
  //     'No Of Close Leads': '2',
  //   },
  // ];

  return (
    <div style={{ padding: 24 }}>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} bordered />
    </div>
  );
};

export default EmpTrack;
