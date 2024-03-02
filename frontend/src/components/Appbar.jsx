import React, { useEffect } from "react";
import axios from "axios";

/**
 * Functional component representing the application's app bar.
 * It fetches user information upon component mount.
 * @returns {JSX.Element} JSX representation of the component.
 */
function Appbar() {
  const token = localStorage.getItem("token");

  // Effect to fetch user information upon component mount
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await axios.get(`http://ec2-13-50-109-3.eu-north-1.compute.amazonaws.com:3000/app/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Process the response here if needed
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };
    fetchMe();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        padding: "10px",
      }}
    >
      {/* Application title */}
      <div
        style={{
          display: "flex",
          padding: "10px",
          fontFamily: `'Tektur', sans-serif`,
          fontSize: "4rem",
          fontWeight: "900",
          letterSpacing: "0.8rem",
        }}
      >
        TODO
      </div>
    </div>
  );
}

export default Appbar;
