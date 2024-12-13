import React from "react";
import { ThemeProvider } from "../ThemeContext";
import ThemeToggle from "../ThemeToggle";
import HomeSlider from "../HomePageLayouts/HomeSlider";
import LatestVisasSection from "../HomePageLayouts/LatestVisasSection";
import VisaProcessSection from "../HomePageLayouts/VisaProcessSection";
import GlobalSupportSection from "../HomePageLayouts/GlobalSupportSection";
import TestimonialsSection from "../HomePageLayouts/TestimonialsSection";
import { Fade } from "react-awesome-reveal";

const HomePage = () => {
  return (
    <ThemeProvider>
      <div
        className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-900 
        min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300"
      >
        <ThemeToggle />
        <HomeSlider />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Apply the fade effect with custom duration, delay */}
          <Fade duration={1200} delay={200} easing="ease-in-out">
            <LatestVisasSection />
          </Fade>

          <Fade duration={1200} delay={400} easing="ease-in-out">
            <VisaProcessSection />
          </Fade>

          <Fade duration={1200} delay={600} easing="ease-in-out">
            <GlobalSupportSection />
          </Fade>

          <Fade duration={1200} delay={800} easing="ease-in-out">
            <TestimonialsSection />
          </Fade>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default HomePage;
