import React, { useState } from 'react';

const VisaProcessSection = () => {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      title: 'Choose Your Destination',
      description: 'Select the country you wish to visit and check visa requirements.',
      gradient: 'from-cyan-400 to-blue-500',
      pattern: (
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 200">
          <path fill="currentColor" d="M50 50 L100 0 L150 50 L100 100 Z" />
        </svg>
      ),
    },
    {
      title: 'Select Visa Type',
      description: 'Determine the appropriate visa category for your travel purpose.',
      gradient: 'from-purple-400 to-pink-500',
      pattern: (
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="50" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: 'Prepare Documents',
      description: 'Gather all necessary documents and complete application forms.',
      gradient: 'from-green-400 to-emerald-500',
      pattern: (
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 200">
          <rect x="50" y="50" width="100" height="100" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: 'Submit & Track',
      description: 'Submit your application and track its progress online.',
      gradient: 'from-orange-400 to-red-500',
      pattern: (
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 200">
          <polygon points="100,20 180,100 100,180 20,100" fill="currentColor" />
        </svg>
      ),
    },
  ];

  
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-900 py-20 px-4 overflow-hidden">
      {/* Floating Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-100 dark:bg-cyan-800 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-100 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800 dark:text-gray-100">
          Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Visa Journey</span> Simplified
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
              className={`relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 ease-in-out 
                ${
                  activeStep === index
                    ? `scale-105 bg-gradient-to-br ${step.gradient}`
                    : 'bg-white dark:bg-gray-800 hover:bg-gradient-to-br ' + step.gradient
                } bg-opacity-10 p-8 text-center group`}
            >
              {step.pattern}

              <div className="relative z-10">
                <div
                  className={`text-7xl font-bold mb-6 
                  ${
                    activeStep === index
                      ? 'text-white text-opacity-30'
                      : 'text-gray-400 dark:text-gray-400'
                  } transition-colors duration-500`}
                >
                  0{index + 1}
                </div>

                <div
                  className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center 
                  ${
                    activeStep === index
                      ? 'bg-white bg-opacity-20'
                      : 'bg-gray-100 dark:bg-gray-700'
                  } transition-all duration-500`}
                >
                  {/* Icon SVG */}
                </div>

                <h3
                  className={`text-xl font-bold mb-4 
                  ${
                    activeStep === index ? 'text-white' : 'text-gray-800 dark:text-gray-100'
                  } transition-colors duration-500`}
                >
                  {step.title}
                </h3>

                <p
                  className={`text-sm 
                  ${
                    activeStep === index
                      ? 'text-white text-opacity-80'
                      : 'text-gray-600 dark:text-gray-400'
                  } transition-colors duration-500`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisaProcessSection;
