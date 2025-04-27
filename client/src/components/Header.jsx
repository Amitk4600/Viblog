import React from "react";
import { Link } from "react-router-dom";

function Header({ isModalOpen, setShowLogin }) {
  const navigation = [
    { title: "Story", path: "/login" },
    { title: "Write", path: "/login" },
  ];

  
  return (
    <header>
      <nav className="items-center pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 sm:flex sm:space-x-6">
        <Link to="/">
          <img
            src="/images/logo.png"
            width={120}
            height={50}
            alt="Viblog Logo"
          />
        </Link>
        <ul className="py-4 flex-1 items-center flex space-x-3 sm:space-x-6 sm:justify-end">
          {navigation.map((item, idx) => (
            <li className="text-gray-800" key={idx}>
              <button
                onClick={() => setShowLogin(true)}
                disabled={isModalOpen}
                className={`${
                  isModalOpen
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }`}
              >
                {item.title}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => setShowLogin(true)}
              disabled={isModalOpen}
              className={`flex items-center text-gray-800 ${
                isModalOpen ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              }`}
            >
              Log In
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    </header>
  );
}

export default Header;
