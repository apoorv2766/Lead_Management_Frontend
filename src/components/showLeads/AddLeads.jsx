import React, { useContext, useState } from "react";
import axios from "axios";
import { useLeadContext } from "../../../context";

const AddLead = ({ onClose }) => {
  const { setLeadAdded, leadAdded } = useLeadContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
    alternatePhone: "",
    alternateEmail: "",
    qualification: "",
    interestField: "",
    source: "",
    assignedTo: "",
    jobInterest: "",
    state: "",
    city: "",
    passoutYear: "",
    heardFrom: "",
  });

  console.log("formDataformData", formData);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/lead/createLead",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          status: formData.status,
          alternatePhone: formData.alternatePhone,
          alternateEmail: formData.alternateEmail,
          qualification: formData.qualification,
          interestField: formData.interestField,
          source: formData.source,
          assignedTo: formData.assignedTo,
          jobInterest: formData.jobInterest,
          state: formData.state,
          city: formData.city,
          passoutYear: Number(formData.passoutYear),
          heardFrom: formData.heardFrom,
        }
      );
      setLeadAdded(!leadAdded);
      console.log("Lead Created:", response.data);
      onClose(); // Close modal after successful submit
    } catch (error) {
      console.error("Error creating lead:", error);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[600px] max-w-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add Lead</h2>
        </div>

        {/* Form */}
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-bold ">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-1 font-bold">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Row 2 */}
          <div className="flex flex-col">
            <label htmlFor="alternatePhone" className="mb-1 font-bold">
              Alt. Phone
            </label>
            <input
              type="text"
              id="alternatePhone"
              name="alternatePhone"
              value={formData.alternatePhone}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Row 3 */}
          <div className="flex flex-col">
            <label htmlFor="alternateEmail" className="mb-1 font-bold">
              Alt. Email
            </label>
            <input
              type="text"
              id="alternateEmail"
              name="alternateEmail"
              value={formData.alternateEmail}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="status" className="mb-1 font-bold">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Status</option>
              <option value="New">New</option>
              <option value="Qualified">Qualified</option>
              <option value="Converted">Converted</option>
              <option value="Follow-Up">Follow-Up</option>
            </select>
          </div>

          {/* Row 4 */}
          <div className="flex flex-col">
            <label htmlFor="qualification" className="mb-1 font-bold">
              Qualification
            </label>
            <select
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Qualification</option>
              <option value="highSchool">High School</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="graduate">Graduate</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="interestField" className="mb-1 font-bold">
              Interest Field
            </label>
            <select
              id="interestField"
              name="interestField"
              value={formData.interestField}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Interest</option>
              <option value="webDev">Web Development</option>
              <option value="dataScience">Data Science</option>
              <option value="mobileDev">Mobile Development</option>
              <option value="fullStack">Full Stack Development</option>
            </select>
          </div>

          {/* Row 5 */}
          <div className="flex flex-col">
            <label htmlFor="source" className="mb-1 font-bold">
              Source
            </label>
            <select
              id="source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Source</option>
              <option value="website">Website</option>
              <option value="referral">Referral</option>
              <option value="socialMedia">Social Media</option>
              <option value="linkedin">LinkedIn</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="assignedTo" className="mb-1 font-bold">
              Assigned To
            </label>
            <select
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Manager</option>
              <option value="johnDoe">John Doe</option>
              <option value="janeSmith">Jane Smith</option>
              <option value="manager1">Manager1</option>
            </select>
          </div>

          {/* Row 6 */}
          <div className="flex flex-col">
            <label htmlFor="jobInterest" className="mb-1 font-bold">
              Job Interest
            </label>
            <select
              id="jobInterest"
              name="jobInterest"
              value={formData.jobInterest}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select job interest</option>
              <option value="frontendDev">Frontend Developer</option>
              <option value="backendDev">Backend Developer</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="state" className="mb-1 font-bold">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Row 7 */}
          <div className="flex flex-col">
            <label htmlFor="city" className="mb-1 font-bold">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="passoutYear" className="mb-1 font-bold">
              Passout Year
            </label>
            <input
              type="number"
              id="passoutYear"
              name="passoutYear"
              value={formData.passoutYear}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Row 8 (full width) */}
          <div className="flex flex-col col-span-2">
            <label htmlFor="heardFrom" className="mb-1 font-bold">
              Heard From
            </label>
            <input
              type="text"
              id="heardFrom"
              name="heardFrom"
              value={formData.heardFrom}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              // onClick={ ()=>{setLeadAdded(true)}}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            >
              Add Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLead;
