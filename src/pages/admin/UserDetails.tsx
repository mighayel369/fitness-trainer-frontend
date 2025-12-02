import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaUser, FaEnvelope, FaCalendarAlt, FaVenusMars, FaBirthdayCake, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import AdminTopBar from "../../layout/AdminTopBar";
import AdminSideBar from "../../layout/AdminSideBar";
import { adminUserService } from "../../services/adminUserService";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";

type User = {
  name: string;
  email: string;
  _id: string;
  status: boolean;
  createdAt: Date;
  gender?: string;
  age?: number;
};

const DEFAULT_IMAGE =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const UserDetails: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  document.title = "FitConnect | User Details";
}, []);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await adminUserService.fetchUserById(id!);
        setUser(response.user);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  return (
    <>
      <AdminTopBar />
      <AdminSideBar />

      <main className="ml-64 mt-16 p-6 bg-gray-100 min-h-screen flex justify-center items-start">
        {loading ? (
          <Loading message="Loading user data..." />
        ) : !user ? (
          <NotFound message="User not found." />
        ) : (
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-6 border-b pb-6">
              <img
                src={DEFAULT_IMAGE}
                alt={`${user.name}'s avatar`}
                className="w-24 h-24 rounded-full border object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FaUser className="text-gray-500" /> {user.name}
                </h2>
                <p className="text-gray-600 flex items-center gap-2">
                  <FaEnvelope className="text-gray-400" /> {user.email}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                  <FaCalendarAlt className="text-gray-400" /> Joined{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>


            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-gray-700">
                <span className="flex items-center gap-2">
                  <FaVenusMars className="text-gray-400" /> Gender
                </span>
                <span className="font-medium">{user.gender ?? "Not specified"}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span className="flex items-center gap-2">
                  <FaBirthdayCake className="text-gray-400" /> Age
                </span>
                <span className="font-medium">{user.age ?? "Not specified"}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Status</span>
                {user.status ? (
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <FaCheckCircle /> Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-600 font-medium">
                    <FaTimesCircle /> Blocked
                  </span>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                className={`px-5 py-2 rounded-md font-medium text-white shadow-sm transition ${
                  user.status
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {user.status ? "Block User" : "Unblock User"}
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default UserDetails;
