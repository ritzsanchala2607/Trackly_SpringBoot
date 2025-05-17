/* eslint-disable no-alert */
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import Employees from './Employees';

const AddMA = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    name: '',
    email: '',
    phone: '',
    role: 'Marketing Agency',
    district: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Manually Submitted Lead:", formData);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/user/`, formData)
      .then((res) => {
        // eslint-disable-next-line no-alert
        alert(res.data.message);
        setFormData({
          client: '',
          date: '',
          contact_number: '',
          email: '',
          district: '',
          source: '',
        });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        // eslint-disable-next-line no-alert
        alert('Something went wrong during registration.');
      });

    setFormData({
      user_name: '',
      name: '',
      email: '',
      phone: '',
      role: '',
      district: '',
      password: '',
    });
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      alert('Please upload a valid Excel file (.xlsx or .xls)');
      return;
    }

    const reader = new FileReader();

    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const workbook = XLSX.read(bstr, { type: 'binary' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        // ✅ Add role: 'Employee' to each row
        const updatedData = jsonData.map((row) => ({
          ...row,
          role: 'Marketing Agency',
          password: String(row.password),
        }));

        console.log('Updated Data:', updatedData);

        axios
          .post(`${process.env.REACT_APP_BASE_URL}/api/user/excel`, updatedData)
          .then((res) => {
            // eslint-disable-next-line no-alert
            alert(res.data.message);
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.error(err);
            // eslint-disable-next-line no-alert
            alert('Something went wrong during registration.');
          });
        // You can now send `updatedData` to your backend or use it as needed
      } catch (error) {
        console.error('Error reading file:', error);
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-center text-2xl font-semibold mb-6">Add Marketing Agenices</h2>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Manual Lead Entry Form */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Manual Marketing Agenicy Entry</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label className="block font-medium mb-1" htmlFor="user_name">
                User Name:
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label className="block font-medium mb-1" htmlFor="name">
                Name:
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label className="block font-medium mb-1" htmlFor="phone">
                Contact Number:
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label className="block font-medium mb-1" htmlFor="email">
                Email:
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label className="block font-medium mb-1" htmlFor="district">
                District:
                <input
                  type="text"
                  name="district"
                  id="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label className="block font-medium mb-1" htmlFor="password">
                Password:
                <input
                  type="text"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </label>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded w-full transition-colors"
            >
              Submit Lead
            </button>
          </form>
        </div>

        {/* Bulk Upload Form */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Bulk Upload Marketing Agenices</h3>

          <div className="space-y-4">
            <form onSubmit={handleFileUpload} className="space-y-4">
              <div className="form-group">
                <label className="block font-medium mb-1" htmlFor="file">
                  Upload Marketing Agenices via XLSX:
                  <input
                    type="file"
                    id="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                    className="w-full p-2 border rounded"
                  />
                  <a
                    href="/emp_template.xlsx"
                    download
                    className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                  >
                    Download Template
                  </a>
                </label>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded w-full transition-colors"
              >
                Upload & Process File
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMA;
