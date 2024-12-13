import { useContext, useEffect, useState } from "react";
import UpdateModal from "../Pages/UpdateModal";
import { AuthContext } from "../contexts/AuthProvider";
import { toast, ToastContainer } from "react-toastify";

const MyAddedVisas = () => {
  const { user } = useContext(AuthContext);
  const [visas, setVisas] = useState([]);
  const [selectedVisa, setSelectedVisa] = useState(null);
  const [loading, setLoading] = useState(true);

  const userEmail = user && user.email ? user.email : null;

  useEffect(() => {
    if (userEmail) {
      setLoading(true);
      fetch(`https://server-side-pi-seven.vercel.app/my-added-visas?email=${userEmail}`)
        .then((response) => response.json())
        .then((data) => {
          setVisas(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching visas:", error);
          setLoading(false);
        });
    }
  }, [userEmail]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div className="animate-pulse flex flex-col items-center justify-center space-y-4">
          <div className="w-24 h-24 border-4 border-blue-500 border-t-blue-700 rounded-full animate-spin"></div>
          <p className="text-white text-lg font-semibold">Loading Visas...</p>
        </div>
      </div>
    );
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`https://server-side-pi-seven.vercel.app/visa/${id}`, { method: "DELETE" });
      setVisas(visas.filter((visa) => visa._id !== id));
      toast.success("Visa deleted successfully!", {
        position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
      });
    } catch (error) {
      console.error("Error deleting visa:", error);
    }
  };

  const handleUpdate = (visa) => {
    setSelectedVisa(visa);
  };

  const handleModalSubmit = async (updatedVisa) => {
    console.log(updatedVisa);
    try {
      const response = await fetch(
        `https://server-side-pi-seven.vercel.app/visa/${updatedVisa._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedVisa),
        }
      );
      const result = await response.json();

      setVisas(visas.map((visa) => (visa._id === result._id ? result : visa)));
      setSelectedVisa(null);
    } catch (error) {
      console.error("Error updating visa:", error);
    }
  };

  const getColorScheme = (visaType) => {
    const colorSchemes = {
      Tourist: "from-sky-100 to-sky-300 text-sky-900",
      Business: "from-emerald-100 to-emerald-300 text-emerald-900",
      Student: "from-indigo-100 to-indigo-300 text-indigo-900",
      Work: "from-amber-100 to-amber-300 text-amber-900",
      Transit: "from-teal-100 to-teal-300 text-teal-900",
    };
    return colorSchemes[visaType] || "from-gray-100 to-gray-300 text-gray-900";
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer/>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          My Added Visas
        </h1>

        {visas.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <p className="text-xl text-gray-600 mb-4">No visas added yet</p>
            <p className="text-sm text-gray-500">
              Start adding your visa information to track them easily
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visas.map((visa) => (
              <div
                key={visa._id}
                className={`
                  bg-gradient-to-br ${getColorScheme(visa.visaType)} 
                  rounded-2xl shadow-2xl overflow-hidden 
                  transform transition-all duration-300 
                  hover:scale-105 hover:shadow-2xl
                  border border-opacity-10
                `}
              >
                <div className="relative">
                  <img
                    src={visa.countryImage}
                    alt={`${visa.countryName} flag`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-black bg-opacity-40 text-white px-4 py-2 rounded-br-xl">
                    <h3 className="text-xl font-bold tracking-tight">
                      {visa.countryName}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-opacity-70">
                        Visa Type
                      </p>
                      <p className="font-bold">{visa.visaType}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-opacity-70">
                        Processing Time
                      </p>
                      <p className="font-bold">{visa.processingTime}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-opacity-70">
                        Fee
                      </p>
                      <p className="font-bold text-green-700">${visa.fee}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-opacity-70">
                        Validity
                      </p>
                      <p className="font-bold">{visa.validity}</p>
                    </div>
                  </div>
                  <p className="text-sm mb-4 opacity-80">
                    <strong>Application Method:</strong>{" "}
                    {visa.applicationMethod}
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleUpdate(visa)}
                      className="
                        flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                      "
                    >
                      <span className="font-semibold">Update</span>
                    </button>
                    <button
                      onClick={() => handleDelete(visa._id)}
                      className="
                        flex-1 bg-red-500 text-white py-3 rounded-lg 
                        hover:bg-red-600 transition-colors 
                        flex items-center justify-center space-x-2
                        focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50
                      "
                    >
                      <span className="font-semibold">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedVisa && (
        <UpdateModal
          visa={selectedVisa}
          onClose={() => setSelectedVisa(null)}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default MyAddedVisas;
