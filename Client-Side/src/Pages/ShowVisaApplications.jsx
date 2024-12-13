import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { toast, ToastContainer } from "react-toastify";

const ShowVisaApplications = () => {
  const { user } = useContext(AuthContext);
  const [visaApplications, setVisaApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Get the email of the logged-in user
  const userEmail = user && user.email ? user.email : null;

  // Fetch data from backend
  useEffect(() => {
    if (userEmail) {
      setIsLoading(true);
      fetch(`https://server-side-pi-seven.vercel.app/visaApplications?email=${userEmail}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response:", data);
          // Check if data is an array; if not, set it to an empty array
          const applications = Array.isArray(data) ? data : [];
          setVisaApplications(applications);
          setFilteredApplications(applications);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching visa applications:", error);
          setIsLoading(false);
          toast.error("Failed to load visa applications.");
        });
    } else {
      setIsLoading(false);
    }
  }, [userEmail]);

  const handleCancel = (applicationId) => {
    if (!userEmail) {
      toast.error("User email is not available.");
      return;
    }

    fetch(`https://server-side-pi-seven.vercel.app/visaApplications?email=${userEmail}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Clear the visaApplications state after successful deletion
          setVisaApplications([]);
          setFilteredApplications([]);

          toast.success(
            "All applications for this email canceled successfully.",
            {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
        } else {
          toast.error("Failed to cancel applications for this email.");
        }
      })
      .catch((error) => console.error("Error canceling applications:", error));
  };

  // Search functionality
  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    const filtered = visaApplications.filter((visa) => 
      visa.countryName.toLowerCase().includes(query)
    );
    setFilteredApplications(filtered);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8">
      <ToastContainer />
      <div className="container mx-auto">
        {/* Search Section */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl md:text-4xl font-extrabold text-blue-900 mb-4 sm:mb-0 tracking-tight">
            My Visa Applications
          </h1>
          <div className="flex w-full sm:w-auto">
            <input 
              type="text" 
              placeholder="Search by country name" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 border border-blue-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {filteredApplications.length === 0 ? (
          <div className="text-center bg-white shadow-lg rounded-xl p-8 md:p-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 md:h-24 md:w-24 mx-auto text-blue-300 mb-4 md:mb-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-base md:text-xl text-gray-600">
              {searchQuery 
                ? "No visa applications found matching your search." 
                : "No visa applications found."}
            </p>
            {searchQuery && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setFilteredApplications(visaApplications);
                }}
                className="mt-4 text-blue-500 hover:text-blue-600 underline"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredApplications.map((visa) => (
              <div
                key={visa._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative">
                  <img
                    src={visa.countryImage}
                    alt={visa.countryName}
                    className="w-full h-36 md:h-48 object-cover"
                  />
                  <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-blue-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                    {visa.visaType}
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-2 md:mb-4">
                    {visa.countryName}
                  </h2>
                  <div className="space-y-1 md:space-y-2 text-gray-600 mb-4 md:mb-6">
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="font-semibold">Processing Time:</span>
                      <span>{visa.processingTime}</span>
                    </div>
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="font-semibold">Fee:</span>
                      <span className="text-green-600">${visa.fee}</span>
                    </div>
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="font-semibold">Validity:</span>
                      <span>{visa.validity}</span>
                    </div>
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="font-semibold">Applied Date:</span>
                      <span>{visa.appliedDate}</span>
                    </div>
                  </div>
                  <div className="border-t pt-2 md:pt-4 text-gray-700 text-sm md:text-base">
                    <div className="mb-1 md:mb-2">
                      <span className="font-semibold">Applicant:</span>{" "}
                      {visa.applicantFirstName} {visa.applicantLastName}
                    </div>
                    <div className="mb-1 md:mb-2">
                      <span className="font-semibold">
                        Application Method:{" "}
                      </span>
                      <span>{visa.applicationMethod}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Email:</span>{" "}
                      {visa.applicantEmail}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCancel(visa._id)}
                    className="w-full mt-4 bg-red-500 text-white py-2 md:py-3 rounded-lg hover:bg-red-600 transition-colors text-sm md:text-base"
                  >
                    Cancel Application
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowVisaApplications;