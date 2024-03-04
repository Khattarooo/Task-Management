import { useState } from "react";
import Spinner from "./Components/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import ActiveTaks from "./Components/ActiveTaks";

function App() {
  const [isSignInActive, setIsSignInActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [completedTaskClicked, setCompletedTaskClicked] =
    useState<boolean>(false);
  const [activeTaskClicked, setActiveTaskClicked] = useState<boolean>(false);

  const handleCompletedClick = () => {
    if (!completedTaskClicked) {
      setIsSignInActive(true);
      setIsLoading(true);
      setCompletedTaskClicked(true);
      setActiveTaskClicked(false);
    }
  };

  const handleActiveClick = () => {
    if (!activeTaskClicked) {
      setIsSignInActive(false);
      setIsLoading(true);
      setCompletedTaskClicked(false);
      setActiveTaskClicked(true);
    }
  };

  const handleOverlayTransitionEnd = () => {
    setIsLoading(false);
  };

  return (
    <div className="mx-auto flex justify-center items-center h-screen">
      <div
        className={`w-full lg:w-3/4  h-3/4 container ${
          isSignInActive ? "right-panel-active" : ""
        }`}
      >
        <div className="button-container py-1  w-full flex justify-center lg:justify-start lg:w-full">
          <button
            className="btn text-white text-sm md:text-md lg:text-lg xl:text-lg bg-gradient-to-r from-indigo-900 to-indigo-500 border-0 rounded-xl py-2 mr-2 mb-2 lg:mb-0 lg:mr-0"
            onClick={handleActiveClick}
          >
            Active Tasks
          </button>
          <button
            className="btn text-white text-sm md:text-md lg:text-lg xl:text-lg bg-gradient-to-r from-green-500 to-green-900 border-0 rounded-xl mb-2 lg:mb-0"
            onClick={handleCompletedClick}
          >
            Completed Tasks
          </button>
        </div>
        <div className="container__form container--signup">
          <form className="form" id="form1">
            Completed
          </form>
        </div>
        <div className="container__form container--signin">
          <form className="form" id="form2">
            <ActiveTaks />
          </form>
        </div>
        <div
          className="container__overlay"
          onTransitionEnd={handleOverlayTransitionEnd}
        >
          {isLoading && (
            <div className="spinner-container">
              <Spinner />
            </div>
          )}
          <div className={`overlay ${isLoading ? "loading" : ""}`}>
            <div className="overlay__panel overlay--left"></div>
            <div className="overlay__panel overlay--right"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
