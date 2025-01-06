import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpDown } from "lucide-react";

const AllVisas = () => {
  const [visas, setVisas] = useState([]);
  const [filteredVisas, setFilteredVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVisaType, setSelectedVisaType] = useState('');
  const [sortOrder, setSortOrder] = useState('none'); // 'none', 'asc', or 'desc'

  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const response = await fetch("https://server-side-pi-seven.vercel.app/visas");
        const data = await response.json();
        setVisas(data);
        setFilteredVisas(data);
      } catch (error) {
        console.error("Error fetching visas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisas();
  }, []);

  // Get unique visa types for dropdown
  const visaTypes = [...new Set(visas.map(visa => visa.visaType))];

  // Filter visas based on selected type
  const handleFilterChange = (e) => {
    const type = e.target.value;
    setSelectedVisaType(type);
    
    if (type) {
      const filtered = visas.filter(visa => visa.visaType === type);
      setFilteredVisas(filtered);
    } else {
      setFilteredVisas(visas);
    }
  };

  // Handle sorting
  const handleSort = () => {
    let sortedVisas = [...filteredVisas];
    
    if (sortOrder === 'none' || sortOrder === 'desc') {
      // Sort ascending
      sortedVisas.sort((a, b) => a.fee - b.fee);
      setSortOrder('asc');
    } else {
      // Sort descending
      sortedVisas.sort((a, b) => b.fee - a.fee);
      setSortOrder('desc');
    }
    
    setFilteredVisas(sortedVisas);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-center md:text-left mb-4 md:mb-0">
            All Visas
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="w-full md:w-64">
              <select 
                value={selectedVisaType}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Visa Types</option>
                {visaTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={handleSort}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              <ArrowUpDown size={20} />
              Sort by Fee {sortOrder === 'asc' ? '(Low to High)' : sortOrder === 'desc' ? '(High to Low)' : ''}
            </button>
          </div>
        </div>

        {filteredVisas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredVisas.map((visa) => (
              <div
                key={visa._id}
                className="bg-white rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative">
                  <img
                    src={visa.countryImage}
                    alt={`${visa.countryName} flag`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-black/50 text-white px-3 py-1 m-2 rounded-md">
                    {visa.visaType}
                  </div>
                </div>
                
                <div className="p-5">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {visa.countryName}
                  </h2>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processing Time:</span>
                      <span className="font-semibold">{visa.processingTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fee:</span>
                      <span className="font-semibold text-green-600">
                        $ {visa.fee}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/visa/${visa._id}`}
                    className="block w-full text-center bg-gradient-to-r from-blue-400 to-purple-500 text-gray-800 font-semibold py-2 rounded-md hover:from-blue-500 hover:to-purple-600 transition duration-300"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No visas available for the selected type.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllVisas;