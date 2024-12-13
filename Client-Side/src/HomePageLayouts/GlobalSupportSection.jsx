import React, { useState } from "react";
import { Globe, Shield, HeartHandshake, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

const GlobalSupportSection = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  const supportFeatures = [
    {
      icon: Globe,
      title: "Global Network",
      description: "Extensive connections with embassies and consulates worldwide.",
      gradient: "from-cyan-400 to-blue-600",
      pattern: (
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="currentColor" fillOpacity="0.1" />
          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="2" fill="none" strokeOpacity="0.2" />
        </svg>
      )
    },
    {
      icon: Shield,
      title: "Secure Processing",
      description: "State-of-the-art security measures to protect your personal information.",
      gradient: "from-emerald-400 to-green-600",
      pattern: (
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 200">
          <path d="M100 50 L150 100 L100 150 L50 100 Z" fill="currentColor" fillOpacity="0.1" />
        </svg>
      )
    },
    {
      icon: HeartHandshake,
      title: "Personalized Support",
      description: "Dedicated consultants to guide you through every step of your visa journey.",
      gradient: "from-purple-400 to-indigo-600",
      pattern: (
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 200">
          <rect x="50" y="50" width="100" height="100" fill="currentColor" fillOpacity="0.1" transform="rotate(45 100 100)" />
        </svg>
      )
    },
    {
      icon: Headphones,
      title: "24/7 Assistance",
      description: "Round-the-clock support for all your visa and travel inquiries.",
      gradient: "from-rose-400 to-red-600",
      pattern: (
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 200">
          <path d="M50 100 Q100 50, 150 100 T250 100" stroke="currentColor" strokeWidth="2" fill="none" strokeOpacity="0.2" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-900 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-100 dark:bg-cyan-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto max-w-7xl relative z-10 text-center">
        <h2 className="text-4xl font-black mb-16 text-gray-800 dark:text-gray-200">
          Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-600">Global Travel</span> Companion
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {supportFeatures.map((feature, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
              className={`relative overflow-hidden rounded-3xl shadow-lg transition-all duration-500 ease-in-out transform 
                ${activeFeature === index ? 'scale-105 shadow-2xl' : 'hover:scale-105'}
                bg-white dark:bg-gray-700`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                {feature.pattern}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10`}></div>
              </div>

              <div className="relative z-10 p-8">
                {/* Icon Container */}
                <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center 
                  ${activeFeature === index 
                    ? `bg-gradient-to-br ${feature.gradient} text-white` 
                    : 'bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400'}
                  transition-all duration-500`}>
                  <feature.icon size={48} strokeWidth={1.5} />
                </div>

                {/* Feature Title */}
                <h3 className={`text-xl font-bold mb-4 
                  ${activeFeature === index 
                    ? 'text-transparent bg-clip-text ' + feature.gradient 
                    : 'text-gray-800 dark:text-gray-200'}
                  transition-colors duration-500`}>
                  {feature.title}
                </h3>

                {/* Feature Description */}
                <p className={`text-sm 
                  ${activeFeature === index 
                    ? 'text-gray-700 dark:text-gray-300' 
                    : 'text-gray-600 dark:text-gray-400'}
                  transition-colors duration-500`}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Link to="/">
            <button className="px-10 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 
              text-white font-bold text-lg hover:from-cyan-600 hover:to-indigo-700 
              transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Start Your Journey
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GlobalSupportSection;
