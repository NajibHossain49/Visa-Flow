import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const VisaCard = ({ visa }) => (
  <div className="bg-white dark:bg-gray-800 border-2 border-teal-100 dark:border-gray-600 rounded-2xl shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
    <div className="relative">
      <img
        src={visa.countryImage}
        alt={visa.countryName}
        className="w-full h-56 object-cover transition duration-300 transform hover:scale-110"
      />
      <div className="absolute top-4 right-4 bg-teal-500 dark:bg-teal-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
        {visa.visaType}
      </div>
    </div>

    <div className="p-6 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-700 dark:to-gray-800">
      <h3 className="text-2xl font-extrabold text-teal-800 dark:text-teal-300 mb-4">
        {visa.countryName}
      </h3>

      <div className="space-y-3 text-gray-700 dark:text-gray-300">
        <div className="flex justify-between items-center border-b pb-2 border-teal-100 dark:border-gray-600">
          <span className="font-medium">Processing Time:</span>
          <span className="text-teal-600 dark:text-teal-400 font-bold">{visa.processingTime}</span>
        </div>

        <div className="flex justify-between items-center border-b pb-2 border-teal-100 dark:border-gray-600">
          <span className="font-medium">Fee:</span>
          <span className="text-green-600 dark:text-green-400 font-bold">${visa.fee}</span>
        </div>

        <div className="flex justify-between items-center border-b pb-2 border-teal-100 dark:border-gray-600">
          <span className="font-medium">Validity:</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold">{visa.validity}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium">Application:</span>
          <span className="text-purple-600 dark:text-purple-400 font-bold">{visa.applicationMethod}</span>
        </div>
      </div>

      <Link
        to={`/visa/${visa._id}`}
        className="mt-6 block w-full text-center bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-700 dark:to-blue-700 text-white py-3 rounded-lg 
        hover:from-teal-600 hover:to-blue-600 dark:hover:from-teal-800 dark:hover:to-blue-800 transition duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-xl"
      >
        Explore Details
      </Link>
    </div>
  </div>
);

const LatestVisasSection = () => {
  const [visas, setVisas] = useState([]);

  useEffect(() => {
    fetch('https://server-side-pi-seven.vercel.app/latestVisas')
      .then((response) => response.json())
      .then((data) => {
        setVisas(data);
      })
      .catch((error) => {
        console.error('Error fetching latest visas:', error);
      });
  }, []);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-900">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">
          Latest Visa Opportunities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visas.map((visa) => (
            <VisaCard key={visa._id} visa={visa} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/all-visas"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-teal-500 dark:from-green-700 dark:to-teal-700 
            text-white font-bold text-lg hover:from-green-600 hover:to-teal-600 dark:hover:from-green-800 dark:hover:to-teal-800 
            transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Explore All Visas
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestVisasSection;
