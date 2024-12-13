import { useState } from "react";

const UpdateModal = ({ visa, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ ...visa });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedDocuments = checked
      ? [...(formData.requiredDocuments || []), value]
      : formData.requiredDocuments.filter((doc) => doc !== value);

    setFormData({ ...formData, requiredDocuments: updatedDocuments });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Enhanced responsive input and label styles
  const inputStyles = `
    w-full px-4 py-2 
    border border-gray-300 
    rounded-lg 
    bg-white 
    text-gray-900 
    focus:outline-none 
    focus:ring-2 
    focus:ring-blue-500 
    focus:border-transparent 
    transition duration-300 
    shadow-sm 
    hover:shadow-md
    dark:bg-gray-800 
    dark:text-gray-200 
    dark:border-gray-600
    dark:focus:ring-blue-400
  `;

  const labelStyles = `
    block 
    text-sm 
    font-medium 
    text-gray-700 
    mb-2 
    mt-4 
    dark:text-gray-300
  `;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
      <div
        className="
        relative
        bg-white 
        dark:bg-gray-900 
        w-full 
        max-w-2xl 
        max-h-[95vh]
        rounded-2xl 
        shadow-2xl 
        flex 
        flex-col
        border 
        border-gray-200 
        dark:border-gray-700
        overflow-hidden
      "
      >
        {/* Header with gradient and elegant styling */}
        <div
          className="
          bg-gradient-to-r 
          from-blue-600 
          via-purple-600 
          to-indigo-600 
          p-6 
          text-center
          flex-shrink-0
        "
        >
          <h2
            className="
            text-3xl 
            font-extrabold 
            text-white 
            tracking-tight 
            bg-clip-text 
            text-transparent 
            bg-gradient-to-r 
            from-white 
            to-blue-200
          "
          >
            Update Visa Information
          </h2>
        </div>

        {/* Scrollable Form Container */}
        <div
          className="
          flex-grow 
          overflow-y-auto 
          px-6 
          sm:px-8 
          md:px-10 
          py-6 
          scrollbar-thin 
          scrollbar-thumb-gray-300 
          scrollbar-track-gray-100
          dark:scrollbar-thumb-gray-600 
          dark:scrollbar-track-gray-800
        "
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pb-20">
              {/* Country Name */}
              <div>
                <label htmlFor="countryName" className={labelStyles}>
                  Country Name
                </label>
                <input
                  id="countryName"
                  type="text"
                  name="countryName"
                  value={formData.countryName}
                  onChange={handleChange}
                  className={inputStyles}
                  required
                  placeholder="Enter country name"
                />
              </div>

              {/* Country Image */}
              <div>
                <label htmlFor="countryImage" className={labelStyles}>
                  Country Image URL
                </label>
                <input
                  id="countryImage"
                  type="url"
                  name="countryImage" // Match the backend field name
                  value={formData.countryImage}
                  onChange={handleChange}
                  className={inputStyles}
                  required
                  placeholder="Paste image URL"
                />
              </div>

              {/* Visa Type */}
              <div>
                <label htmlFor="visaType" className={labelStyles}>
                  Visa Type
                </label>
                <select
                  id="visaType"
                  name="visaType"
                  value={formData.visaType}
                  onChange={handleChange}
                  className={inputStyles}
                  required
                >
                  <option value="" disabled>
                    Select Visa Type
                  </option>
                  {[
                    "Tourist visa",
                    "Student visa",
                    "Official visa",
                    "Work visa",
                    "Transit visa",
                    "Business visa",
                  ].map((type) => (
                    <option
                      key={type}
                      value={type}
                      className="dark:bg-gray-800"
                    >
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Processing Time */}
              <div>
                <label htmlFor="processingTime" className={labelStyles}>
                  Processing Time
                </label>
                <input
                  id="processingTime"
                  type="text"
                  name="processingTime"
                  value={formData.processingTime}
                  onChange={handleChange}
                  className={inputStyles}
                  required
                  placeholder="e.g., 5-10 business days"
                />
              </div>

              {/* Required Documents */}
              <div className="col-span-1 sm:col-span-2">
                <label htmlFor="requiredDocuments" className={labelStyles}>
                  Required Documents
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    "Valid passport",
                    "Visa application form",
                    "Recent passport-sized photograph",
                    "Proof of funds",
                    "Travel itinerary",
                    "Accommodation proof",
                  ].map((doc) => (
                    <div key={doc} className="flex items-center">
                      <input
                        type="checkbox"
                        id={doc}
                        name="requiredDocuments"
                        value={doc}
                        checked={formData.requiredDocuments?.includes(doc)}
                        onChange={handleCheckboxChange}
                        className="
                          mr-2 
                          text-blue-600 
                          focus:ring-blue-500 
                          dark:focus:ring-blue-400 
                          rounded
                        "
                      />
                      <label
                        htmlFor={doc}
                        className="text-sm dark:text-gray-300"
                      >
                        {doc}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="col-span-1 sm:col-span-2">
                <label htmlFor="description" className={labelStyles}>
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`${inputStyles} h-32`}
                  required
                  placeholder="Enter visa details and requirements"
                ></textarea>
              </div>

              {/* Age Restriction */}
              <div>
                <label htmlFor="ageRestriction" className={labelStyles}>
                  Age Restriction
                </label>
                <input
                  id="ageRestriction"
                  type="number"
                  name="ageRestriction"
                  value={formData.ageRestriction}
                  onChange={handleChange}
                  className={inputStyles}
                  placeholder="Minimum age"
                />
              </div>

              {/* Fee */}
              <div>
                <label htmlFor="fee" className={labelStyles}>
                  Fee
                </label>
                <input
                  id="fee"
                  type="number"
                  name="fee"
                  value={formData.fee}
                  onChange={handleChange}
                  className={inputStyles}
                  required
                  placeholder="Visa processing fee"
                />
              </div>

              {/* Validity Period */}
              <div>
                <label htmlFor="validity" className={labelStyles}>
                  Validity Period
                </label>
                <input
                  id="validity"
                  type="text"
                  name="validity"
                  value={formData.validity}
                  onChange={handleChange}
                  className={inputStyles}
                  required
                  placeholder="e.g., 1 year from issue date"
                />
              </div>

              {/* Application Method */}
              <div>
                <label htmlFor="applicationMethod" className={labelStyles}>
                  Application Method
                </label>
                <select
                  id="applicationMethod"
                  name="applicationMethod"
                  value={formData.applicationMethod}
                  onChange={handleChange}
                  className={inputStyles}
                  required
                >
                  <option value="" disabled>
                    Select Application Method
                  </option>
                  <option value="online" className="dark:bg-gray-800">
                    Online
                  </option>
                  <option value="in-person" className="dark:bg-gray-800">
                    In-person
                  </option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Sticky Action Buttons */}
        <div
          className="
          sticky 
          bottom-0 
          left-0 
          right-0 
          bg-white 
          dark:bg-gray-900 
          shadow-2xl 
          p-4 
          z-50
          flex 
          justify-center 
          space-x-4
          border-t 
          border-gray-200 
          dark:border-gray-700
          flex-shrink-0
        "
        >
          <button
            type="submit"
            onClick={handleSubmit}
            className="
              flex-1 
              max-w-xs
              px-6 
              py-3 
              bg-gradient-to-r 
              from-green-500 
              to-green-600 
              text-white 
              font-bold 
              rounded-lg 
              hover:from-green-600 
              hover:to-green-700 
              transition 
              duration-300 
              transform 
              hover:scale-105 
              focus:outline-none 
              focus:ring-2 
              focus:ring-green-400
            "
          >
            Update Visa
          </button>
          <button
            type="button"
            onClick={onClose}
            className="
              flex-1 
              max-w-xs
              px-6 
              py-3 
              bg-gradient-to-r 
              from-red-500 
              to-red-600 
              text-white 
              font-bold 
              rounded-lg 
              hover:from-red-600 
              hover:to-red-700 
              transition 
              duration-300 
              transform 
              hover:scale-105 
              focus:outline-none 
              focus:ring-2 
              focus:ring-red-400
            "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
