import TrainerTopBar from "../../layout/TrainerTopBar";
import TrainerSideBar from "../../layout/TrainerSideBar";
import { useEffect, useState } from "react";
import { InfoItem } from "../../components/InfoItem";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaDumbbell,
  FaStar,
  FaClock,
  FaMoneyBillWave,
  FaCamera
} from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { trainerService } from "../../services/trainerService";

const DEFAULT_IMAGE =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const TrainerProfile = () => {
  const navigate=useNavigate()
  const [trainer, setTrainer] = useState<any>(null);
  useEffect(() => {
  document.title = "FitConnect | Trainer Profile";
}, []);
    const handleReapply = () => {
    navigate("/trainer/trainer-profile/re-apply");
  };
      const handleEditProfile = () => {
    navigate("/trainer/trainer-profile/edit-profile");
  };
  useEffect(() => {
    const fetchTrainerProfile = async () => {
      try {
        const res = await trainerService.getTrainerDetails();
        console.log(res);
        setTrainer(res?.trainer || null);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTrainerProfile();
  }, []);

  const handleProfilePicChange=async(e: React.ChangeEvent<HTMLInputElement>)=>{
    const file=e.target.files?.[0]
    if(!file) return

    try{
       const formData = new FormData();
       formData.append("image", file);

       const res=await trainerService.updateTrainerProfilePic(formData)
      console.log(res)
       setTrainer((prev:any)=>({
        ...prev,
        profilePic:res?.imageUrl
       }))
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TrainerTopBar />
      <TrainerSideBar />

      <main className="ml-72 pt-24 px-10">
        <h1 className="text-4xl font-bold mb-10 text-gray-800">Profile</h1>

        {trainer ? (
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-10 flex gap-10">
            <div className="flex flex-col items-center">
<div className="relative">
  <img
    src={trainer.profilePic || DEFAULT_IMAGE}
    alt="Trainer"
    className="w-60 h-60 object-cover rounded-full shadow-lg"
  />


  <label
    htmlFor="profilePicUpload"
    className="absolute bottom-2 right-4 bg-blue-600 p-2 rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition"
  >
    <FaCamera className="text-white text-lg" />
  </label>


  <input
    type="file"
    id="profilePicUpload"
    accept="image/*"
    className="hidden"
    onChange={handleProfilePicChange}
  />
</div>

              <button
                className="mt-6 px-5 py-2 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  trainer.verified === "pending" ||
                  trainer.verified === "rejected"
                }
                onClick={handleEditProfile}
              >
                Edit Profile
              </button>

              {trainer.verified === "rejected" && (
                <button className="mt-3 px-5 py-2 bg-red-500 text-white font-semibold rounded-xl shadow hover:bg-red-600 transition" onClick={handleReapply}>
                  Reapply
                </button>
              )}
            </div>


            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900">
                {trainer.name || "Not added"}
              </h2>
              <p className="text-gray-600 flex items-center mt-2">
                <FaMapMarkerAlt className="mr-2 text-blue-600" />
                {trainer.address || "Not added"}
              </p>
              <p className="mt-4 text-gray-700 leading-relaxed">
                {trainer.bio || "No bio added yet."}
              </p>

              <div className="mt-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    trainer.verified === "accepted"
                      ? "bg-green-100 text-green-700"
                      : trainer.verified === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {trainer.verified}
                </span>
              </div>

              {trainer.verified === "rejected" && (
                <p className="mt-3 text-red-600 font-medium">
                  Reason: {trainer.rejectReason || "No reason provided"}
                </p>
              )}

              <div className="grid grid-cols-2 gap-6 mt-8">
                <InfoItem
                  icon={<MdWork className="text-blue-600 text-xl" />}
                  label="Experience"
                  value={trainer.experience || "Not added"}
                />
                <InfoItem
                  icon={<FaDumbbell className="text-blue-600 text-xl" />}
                  label="Specialization"
                  value={trainer.specialization || "Not added"}
                />
                <InfoItem
                  icon={<FaStar className="text-yellow-500 text-xl" />}
                  label="Rating"
                  value={trainer.rating || "0"}
                />
                <InfoItem
                  icon={<FaClock className="text-blue-600 text-xl" />}
                  label="Availability"
                  value={
                    trainer.status ? (
                      <span className="text-green-600 font-semibold">Active</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Not Active</span>
                    )
                  }
                />
                <InfoItem
                  icon={<FaMoneyBillWave className="text-green-600 text-xl" />}
                  label="Pricing"
                  value={trainer.pricing || "Not added"}
                />
                <InfoItem
                  icon={<FaDumbbell className="text-blue-600 text-xl" />}
                  label="Languages"
                  value={
                    trainer.languages?.length
                      ? trainer.languages.join(", ")
                      : "Not added"
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading profile...</p>
        )}
      </main>
    </div>
  );
};



export default TrainerProfile;
