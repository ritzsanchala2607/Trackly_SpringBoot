import React, { useState } from "react";
import * as XLSX from "xlsx";

const AddLeads = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    contactNumber: "",
    email: "",
    district: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Manually Submitted Lead:", formData);
    setFormData({
      name: "",
      date: "",
      contactNumber: "",
      email: "",
      district: "",
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      console.log("Uploaded XLSX Data:", jsonData);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="p-6 bg-white-100 min-h-screen">
      <h2 className="text-center text-xl font-semibold mb-4">Add Leads</h2>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <label className="block font-semibold">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-2"
        />

        <label className="block font-semibold">Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-2"
        />

        <label className="block font-semibold">Contact Number:</label>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-2"
        />

        <label className="block font-semibold">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-2"
        />

        <label className="block font-semibold">District:</label>
        <input
          type="text"
          name="district"
          value={formData.district}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-4"
        />

        <div className="mb-2">
          <label className="block font-semibold mb-1">Upload Leads via XLSX:</label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="w-full p-2 border rounded"
          />
          <a
            href="/lead_template.xlsx"
            download
            className="text-sm text-blue-600 hover:underline mt-1 inline-block"
          >
            Download Template
          </a>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full mb-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddLeads;
