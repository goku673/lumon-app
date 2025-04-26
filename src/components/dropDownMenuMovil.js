import React from "react";

const DropDownMenuMovil = ({ children, isMenuOpen, className }) => {
  return (
    <div className={`bg-white ${className}`}>
      <div className="px-2  pb-3 space-y-1 sm:px-3">
        {children}
      </div>
      <div
        className="p-4 border-t"
        style={{
          opacity: isMenuOpen ? 1 : 0,
          transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s ease',
          transitionDelay: '500ms',
        }}
      >
  
      </div>
    </div>
  );
};

export default DropDownMenuMovil;