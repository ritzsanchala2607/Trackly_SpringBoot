/* eslint-disable no-alert */
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    name: '',
    email: '',
    phone: '',
    role: 'Employee',
    district: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.user_name.trim()) newErrors.user_name = 'Username is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.district.trim()) newErrors.district = 'District is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/user/`, formData)
      .then((res) => {
        alert(res.data.message);
        setFormData({
          user_name: '',
          name: '',
          email: '',
          phone: '',
          role: 'Employee',
          district: '',
          password: '',
        });
        setErrors({});
      })
      .catch((err) => {
        console.error(err);
        alert('Something went wrong during registration.');
      });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      alert('Please upload a valid Excel file (.xlsx or .xls)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const workbook = XLSX.read(evt.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        const updatedData = jsonData.map((row) => ({
          ...row,
          role: 'Employee',
          password: String(row.password), // convert password to string
        }));

        console.log(updatedData);

        axios
          .post(`${process.env.REACT_APP_BASE_URL}/api/user/excel`, updatedData)
          .then((res) => alert(res.data.message))
          .catch((err) => {
            console.log(err);
            alert('Something went wrong during Excel upload.');
          });
      } catch (error) {
        console.error('Error reading file:', error);
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-center text-2xl font-semibold mb-6">Add Employees</h2>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Manual Entry */}
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg shadow-sm space-y-4">
          {[
            { id: 'user_name', label: 'User Name', type: 'text' },
            { id: 'name', label: 'Name', type: 'text' },
            { id: 'email', label: 'Email', type: 'email' },
            { id: 'phone', label: 'Contact Number', type: 'tel' },
            { id: 'district', label: 'District', type: 'text' },
            { id: 'password', label: 'Password', type: 'password' },
          ].map(({ id, label, type }) => (
            <div key={id}>
              <label className="block font-medium mb-1" htmlFor={id}>
                {label}:
              </label>
              <input
                type={type}
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
              {errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}
            </div>
          ))}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded w-full"
          >
            Register Employee
          </button>
        </form>

        {/* Excel Upload */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Upload Employees via Excel</h3>
          <input
            type="file"
            accept=".xlsx,.xls"
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
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
