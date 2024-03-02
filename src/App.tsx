import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

const App: React.FC = () => {
  const [isSignInActive, setIsSignInActive] = useState<boolean>(false);

  const handleCompletedClick = () => {
    setIsSignInActive(true);
  };

  const handleActiveClick = () => {
    setIsSignInActive(false);
  };

  return (
    <div className={`container ${isSignInActive ? "" : "right-panel-active"}`}>
      <div className="button-container">
        <button className="btn" onClick={handleActiveClick}>
          Active Tasks
        </button>
        <button className="btn" onClick={handleCompletedClick}>
          Completed Tasks
        </button>
      </div>
      <div className="container__form container--signup">
        <form className="form" id="form1">
          {/* Sign up form content */}
        </form>
      </div>
      <div className="container__form container--signin">
        <form className="form" id="form2">
          {/* Sign in form content */}
        </form>
      </div>
      <div className="container__overlay">
        <div className="overlay">
          <div className="overlay__panel overlay--left">
            {/* Left panel content */}
          </div>
          <div className="overlay__panel overlay--right">
            {/* Right panel content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
