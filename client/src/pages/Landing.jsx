// Landing.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";

import Login from "./users/Login";
import Registration from "./users/Registration";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Landing() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  const isModalOpen = showLogin || showRegistration;
  const buttonClass = "absolute top-[7rem] right-5 text-red-500 text-[3rem]";
  return (
    <>
      {/* Modal for Login */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
          <div className="relative  p-6 ">
            <button onClick={() => setShowLogin(false)} className={buttonClass}>
              ×
            </button>
            <Login />
          </div>
        </div>
      )}

      {/* Modal for Registration */}
      {showRegistration && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
          <div className="relative  p-6 ">
            <button
              onClick={() => setShowRegistration(false)}
              className={buttonClass}
            >
              ×
            </button>
            <Registration />
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className="bg-white">
        <Header isModalOpen={isModalOpen} setShowLogin={setShowLogin} />

        <section className="mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8 ">
          <div className="space-y-4 flex-1 sm:text-center lg:text-left">
            <h1 className="text-gray-900 font-bold text-4xl xl:text-5xl">
              Build Your Voice with
              <span className="text-indigo-600"> Stunning Blogs</span>
            </h1>
            <p className="text-gray-600 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
              Share your ideas, stories, and knowledge with the world. Our
              simple and powerful blogging platform helps you turn your passion
              into impact — one post at a time.
            </p>

            <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
              <button
                onClick={() => setShowRegistration(true)}
                disabled={isModalOpen}
                className={`px-7 py-3 w-full bg-indigo-600 text-white text-center rounded-md shadow-md block sm:w-auto hover:bg-indigo-700 ${
                  isModalOpen
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }`}
              >
                Get started
              </button>
              <button
                onClick={() => setShowLogin(true)}
                disabled={isModalOpen}
                className={`px-7 py-3 w-full border border-gray-400 text-gray-800 text-center rounded-md block sm:w-auto hover:bg-gray-100 ${
                  isModalOpen
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }`}
              >
                Start reading
              </button>
            </div>
          </div>

          <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
            <img
              src="images/blog.jpg"
              className="w-full mx-auto sm:w-10/12 lg:w-full"
              alt="Blogging illustration"
            />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default Landing;
