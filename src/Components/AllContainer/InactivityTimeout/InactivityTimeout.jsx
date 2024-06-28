import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// or 'react-router' depending on your version

const InactivityTimeout = () => {
  const INACTIVITY_TIME_LIMIT = 1800000 //30 * 60 * 1000; // 50 minutes
  const token = localStorage.getItem("accessToken");
  let isLoggedIn = Boolean(token);
  const navigate = useNavigate();
  const inactivityTimer = useRef(null);

  const navigateToLoginPage = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  const resetInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    inactivityTimer.current = setTimeout(
      navigateToLoginPage,
      INACTIVITY_TIME_LIMIT
    );
  };

  useEffect(() => {
    if(isLoggedIn){
    const activityEvents = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart",
    ];

    const handleActivity = () => {
      resetInactivityTimer();
    };

    // Attach event listeners
    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    // Initialize the inactivity timer
    resetInactivityTimer();

    // Clean up event listeners on component unmount
    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
    }
  }, []);

  return null; // This component does not render anything
};

export default InactivityTimeout;
