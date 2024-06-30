
import React, { useState, useEffect } from "react";

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="pt-lg-10 pt-5 footer bg-white text-black text-center">
    
      <p>{`© ${year} KMIT. All Rights Reserved.`}</p>
      
    </div>
  );
};

export default Footer;
