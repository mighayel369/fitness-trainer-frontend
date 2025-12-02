import TrainerTopBar from "../../layout/TrainerTopBar";
import TrainerSideBar from "../../layout/TrainerSideBar";
import { useEffect } from "react";
const TrainerHome = () => {
useEffect(() => {
  document.title = "FitConnect | Trainer Home";
}, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <TrainerTopBar />
      <TrainerSideBar />
      <main className="ml-72 pt-24 px-10 mt-6">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome, Trainer!</h1>
      </main>
    </div>
  );
};

export default TrainerHome;