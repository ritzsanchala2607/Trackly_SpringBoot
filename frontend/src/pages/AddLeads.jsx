/* eslint-disable no-alert */
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const AddLeads = () => {
  const [formData, setFormData] = useState({
    client: '',
    date: '',
    contact_number: '',
    email: '',
    district: '',
    source: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.client.trim()) newErrors.client = 'Customer name is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.contact_number.trim()) {
      newErrors.contact_number = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contact_number)) {
      newErrors.contact_number = 'Enter a valid 10-digit number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.district.trim()) newErrors.district = 'District is required';
    if (!formData.source) newErrors.source = 'Source is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/lead/`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        alert(res.data.message);
        setFormData({
          client: '',
          date: '',
          contact_number: '',
          email: '',
          district: '',
          source: '',
        });
        setErrors({});
      })
      .catch((err) => {
        console.error(err);
        alert('Something went wrong during registration.');
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

        axios
          .post(`${process.env.REACT_APP_BASE_URL}/api/lead/excel`, jsonData)
          .then((res) => {
            alert(res.data.message);
          })
          .catch((err) => {
            console.error(err);
            alert('Something went wrong during registration.');
          });
      } catch (error) {
        alert('Failed to read the Excel file.');
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-center text-2xl font-semibold mb-6">Add Leads</h2>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Manual Lead Entry Form */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Manual Lead Entry</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'Date', name: 'date', type: 'date' },
              { label: 'Customer Name', name: 'client', type: 'text' },
              { label: 'Contact Number', name: 'contact_number', type: 'tel' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'District', name: 'district', type: 'text' },
            ].map(({ label, name, type }) => (
              <div className="form-group" key={name}>
                <label className="block font-medium mb-1" htmlFor={name}>
                  {label}:
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                  />
                  {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
                </label>
              </div>
            ))}

            <div className="form-group">
              <label className="block font-medium mb-1" htmlFor="source">
                Source:
                <select
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                >
                  <option value="">Select Source</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Youtube">Youtube</option>
                  <option value="News Paper">News Paper</option>
                </select>
                {errors.source && <p className="text-red-500 text-sm mt-1">{errors.source}</p>}
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
          <h3 className="text-lg font-medium mb-4">Bulk Upload Leads</h3>

          <div className="space-y-4">
            <form onSubmit={handleFileUpload} className="space-y-4">
              <div className="form-group">
                <label className="block font-medium mb-1" htmlFor="file">
                  Upload Leads via XLSX:
                  <input
                    type="file"
                    id="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                    className="w-full p-2 border rounded"
                  />
                  <a
                    href="/lead_template.xlsx"
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

export default AddLeads;
