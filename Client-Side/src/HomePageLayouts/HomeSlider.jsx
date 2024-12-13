import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const HomeSlider = () => {
  const sliderData = [
    {
      image: "/travel-banner-1.jpg",
      title: "Explore Global Opportunities",
      subtitle: "Simplifying Your International Travel and Visa Processes",
      buttonText: "Start Your Journey",
      buttonLink: "/",
    },
    {
      image: "/travel-banner-2.jpg",
      title: "Discover New Destinations",
      subtitle: "Comprehensive Visa Solutions for Every Traveler",
      buttonText: "View Available Visas",
      buttonLink: "/",
    },
    {
      image: "/travel-banner-3.jpg",
      title: "Your Trusted Visa Partner",
      subtitle: "Fast, Reliable, and Efficient Visa Application Services",
      buttonText: "Learn More",
      buttonLink: "/",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  }, [sliderData.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + sliderData.length) % sliderData.length
    );
  }, [sliderData.length]);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div
      className="relative w-full h-[600px] overflow-hidden group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {sliderData.map((slide, index) => (
        <div
          key={index}
          className={`
            absolute top-0 left-0 w-full h-full 
            transition-opacity duration-700 ease-in-out
            ${currentSlide === index ? "opacity-100" : "opacity-0"}
          `}
        >
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-teal-400 max-w-3xl px-4">
            {/* Use useTypewriter for title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              <span>
                {slide.title && (
                  <span>
                    {/* Typewriter effect applied here */}
                    <Typewriter
                      words={[slide.title]}
                      loop={false}
                      cursor
                      cursorStyle="|"
                      typeSpeed={100}
                      deleteSpeed={50}
                      delaySpeed={1500}
                    />
                  </span>
                )}
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
              {slide.subtitle}
            </p>
            <Link
              to={slide.buttonLink}
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors duration-300 text-lg font-semibold"
            >
              {slide.buttonText}
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 
        bg-white/30 hover:bg-white/50 rounded-full p-2 
        transition-all duration-300 hidden group-hover:block"
      >
        <ChevronLeft className="text-white" size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 
        bg-white/30 hover:bg-white/50 rounded-full p-2 
        transition-all duration-300 hidden group-hover:block"
      >
        <ChevronRight className="text-white" size={32} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${currentSlide === index ? "bg-white w-6" : "bg-white/50"}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;
