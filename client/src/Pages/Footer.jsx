import React from "react";

export const Footer = () => {
  
  const handleEmailClick = () => {
    window.location.href = "mailto:kota.mohdrafiq@gmail.com";
  };

  
  const handlePhoneClick = () => {
    window.location.href = "tel:+919829740688";
  };
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold">Contact Us</h3>
          <p className="mt-2" onClick={handleEmailClick}>
            kota.mohdrafiq@gmail.com
          </p>
          <p onClick={handlePhoneClick}>+919829740688</p>
        </div>
        <div className="mt-4 md:mt-0">
          <h3 className="text-lg font-bold mb-2">Follow Us</h3>
          <div className="flex items-center">
            <a
              href="https://www.linkedin.com/in/mohammed-rafique-283501113"
              className="mr-4 hover:text-blue-500"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://github.com/Mohammmedrafique"
              className="hover:text-blue-500 w-10"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>&copy; 2024 Your Website. All rights reserved.</p>
      </div>
    </footer>
  );
};


