import React from "react";
import Marquee from "react-fast-marquee";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Emma Charlotte",
      country: "United States",
      text: "The visa process was smooth and hassle-free. Highly recommended!",
      image: "/testimonial-1.jpg",
    },
    {
      name: "Emily Smith",
      country: "Canada",
      text: "Excellent service and quick processing. Made my travel dreams come true!",
      image: "/testimonial-2.jpg",
    },
    {
      name: "Michael Wong",
      country: "Australia",
      text: "Professional team that guided me through every step of my visa application.",
      image: "/testimonial-3.jpg",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-900 py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-indigo-900 dark:text-indigo-200 mb-12">
          What Our Clients Say
        </h2>

        <Marquee
          speed={50}
          gradient={true}
          gradientColor={[248, 250, 252]}
          pauseOnHover={true}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg rounded-xl p-6 min-w-[300px] max-w-[400px] mx-4 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-indigo-200 dark:border-indigo-600"
                />
                <div>
                  <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.country}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default TestimonialsSection;
