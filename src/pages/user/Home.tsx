
import UserNavBar from "../../layout/UserNavBar";
import homeimage from "../../assets/homepage1.jpg";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="relative">
      <img
        src={homeimage}
        alt="home"
        className="w-full h-[700px] object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <div className="absolute top-0 left-0 right-0 z-10">
        <UserNavBar />
      </div>

      <div className="absolute top-[65%] left-0 right-0 z-30 px-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-left text-gray-200">
          Connect With Professional Fitness Trainer
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-right text-yellow-200">
          - Anytime, Anywhere!
        </p>
      </div>
    </div>
  );
};

export default Home;
