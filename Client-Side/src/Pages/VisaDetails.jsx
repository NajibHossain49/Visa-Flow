import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { AuthContext } from "../contexts/AuthProvider";

const VisaDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  console.log("User in VisaDetails component:", user);

  const [visa, setVisa] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicationData, setApplicationData] = useState({
    email: user?.email || "",
    firstName: user?.displayName?.split(" ")[0] || "",
    lastName: user?.displayName?.split(" ")[1] || "",
    appliedDate: new Date().toLocaleDateString("en-CA"),
    fee: "",
  });
  const [errors, setErrors] = useState({});

  // Yup validation schema (unchanged)
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    firstName: Yup.string()
      .required("First Name is required")
      .min(2, "First Name must be at least 2 characters")
      .max(50, "First Name must be at most 50 characters")
      .matches(/^[A-Za-z]+$/, "First Name must contain only letters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .min(2, "Last Name must be at least 2 characters")
      .max(50, "Last Name must be at most 50 characters")
      .matches(/^[A-Za-z]+$/, "Last Name must contain only letters"),
  });

  useEffect(() => {
    const fetchVisaDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://server-side-pi-seven.vercel.app/visas/${id}`);
        const data = await response.json();
        setVisa(data);
        setApplicationData((prev) => ({
          ...prev,
          fee: data.fee,
        }));
      } catch (error) {
        console.error("Error fetching visa details:", error);
        toast.error("Failed to load visa details");
      } finally {
        setIsLoading(false);
      }
    };
    fetchVisaDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleApplyVisa = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(applicationData, { abortEarly: false });
      const najib = {
        ...visa,
        applicantEmail: applicationData.email,
        applicantFirstName: applicationData.firstName,
        applicantLastName: applicationData.lastName,
        appliedDate: applicationData.appliedDate,
        visaId: id,
      };

      delete najib._id;
      const response = await fetch("https://server-side-pi-seven.vercel.app/visa-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(najib),
      });

      if (response.ok) {
        toast.success("Visa Applied successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to submit application");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};
        error.inner.forEach((err) => {
          errorMessages[err.path] = err.message;
        });
        setErrors(errorMessages);
      } else {
        console.error("Visa application error:", error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
  );

  // If loading, show spinner
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!visa) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-200 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 bg-gray-200 shadow-2xl rounded-2xl overflow-hidden">
        {/* Left Side - Visa Image and Details */}
        <div className="relative">
          <img
            src={visa.countryImage}
            alt={`${visa.countryName} flag`}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black to-transparent">
            <h1 className="text-4xl font-bold mb-2">{visa.countryName} Visa</h1>
            <p className="text-xl">{visa.visaType}</p>
          </div>
        </div>

        {/* Right Side - Visa Information */}
        <div className="p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">
                Processing Time
              </h3>
              <p className="text-gray-700">{visa.processingTime}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Visa Fee</h3>
              <p className="text-gray-700 font-bold">${visa.fee}</p>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Visa Requirements
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>
                <strong>Documents:</strong> {visa.requiredDocuments.join(", ")}
              </li>
              <li>
                <strong>Age Restriction:</strong> {visa.ageRestriction}
              </li>
              <li>
                <strong>Validity:</strong> {visa.validity}
              </li>
              <li>
                <strong>Application Method:</strong> {visa.applicationMethod}
              </li>
            </ul>
          </div>

          <p className="text-gray-700 italic">{visa.description}</p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 shadow-lg"
          >
            Apply for Visa
          </button>
        </div>
      </div>

      {/* Modal - Unchanged logic, enhanced styling */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 transform transition-all duration-300 ease-in-out">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Visa Application
            </h2>

            <form onSubmit={handleApplyVisa} className="space-y-6">
              {/* Form fields */}
              {["email", "firstName", "lastName"].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block mb-2 text-gray-700 font-medium capitalize"
                  >
                    {field}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    id={field}
                    name={field}
                    value={applicationData[field]}
                    onChange={handleInputChange}
                    readOnly={field === "email"}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent 
                ${
                  errors[field]
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-300"
                } transition-all duration-300`}
                    placeholder={`Enter your ${field}`}
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-sm mt-1 animate-pulse">
                      {errors[field]}
                    </p>
                  )}
                </div>
              ))}

              {/* Date and Fee fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-gray-700 font-medium">
                    Applied Date
                  </label>
                  <input
                    type="date"
                    name="appliedDate"
                    value={applicationData.appliedDate}
                    readOnly
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 font-medium">
                    Fee
                  </label>
                  <input
                    type="text"
                    name="fee"
                    value={`$${applicationData.fee}`}
                    readOnly
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
              </div>

              {/* Submit and Cancel buttons */}
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 shadow-md"
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaDetails;