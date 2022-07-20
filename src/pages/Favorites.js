import React, { useEffect } from "react";
import "../index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast.configure();
function Favorites() {
  const notify = () =>
    toast.warning("We're sorry", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    notify();
  }, []);

  return (
    <div>
      <h1>My Favorites!</h1>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <span>
        Service is temporarily unavailable. Our engineers are working quickly to
        resolve the issue.
      </span>
    </div>
  );
}

export default Favorites;
