

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminTopBar from "../../layout/AdminTopBar";
import AdminSideBar from "../../layout/AdminSideBar";
import Toast from "../../components/Toast";
import Modal from "../../components/Modal";
import GenericTable from "../../components/GenericTable";
import SearchInput from "../../components/SearchInput";
import Pagination from "../../components/Pagination";

import { adminUserService } from "../../services/adminUserService";

type User = {
  _id: string;
  name: string;
  email: string;
  age?: number;
  gender?: string;
  status: boolean;
};

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await adminUserService.fetchUsers(page, search);
      setUsers(res.users || []);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const handleUserView = (user: User) => {
    navigate(`/admin/users/${user._id}`);
  };

  const handleModalOpen = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedUser) return;
    try {
      const newStatus = !selectedUser.status;
      await adminUserService.updateUserStatus(selectedUser._id, newStatus);
      fetchUsers();
      setToastType("success");
      setToastMessage(`User ${selectedUser.status ? "blocked" : "unblocked"} successfully`);
      setShowModal(false);
      setSelectedUser(null);
    } catch (err) {
      console.error(err);
      setToastType("error");
      setToastMessage("Failed to update user status");
    }
  };

  return (
    <>
      <AdminTopBar />
      <AdminSideBar />
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />
      )}
      <main className="ml-64 mt-16 p-6 bg-gray-100 min-h-screen relative">
        <div className="flex justify-between mb-6 items-center">
          <h2 className="text-3xl font-bold text-gray-800">User List</h2>
          <SearchInput value={search} onChange={setSearch} placeholder="Search users..." />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
          <GenericTable<User>
            data={users}
            page={page}
            loading={loading}
            columns={[
              { header: "Name", accessor: "name" },
              { header: "Email", accessor: "email" },
              { header: "Age", accessor: "age" },
              { header: "Gender", accessor: "gender" },
              {
                header: "Action",
                accessor: "action",
                render: (user) => (
                  <div className="flex justify-center gap-3">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
                      onClick={() => handleUserView(user)}
                    >
                      View
                    </button>
                    <button
                      className={`px-3 py-1 text-white rounded-md text-xs ${
                        user.status
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      }`}
                      onClick={() => handleModalOpen(user)}
                    >
                      {user.status ? "Block" : "Unblock"}
                    </button>
                  </div>
                ),
                className: "text-center",
              },
            ]}
          />

          <Pagination
            page={page}
            totalPages={totalPages}
            onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
            onNext={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          />
        </div>

        {selectedUser && (
          <Modal
            isVisible={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleConfirmAction}
            actionType={selectedUser.status ? "block" : "unblock"}
            userName={selectedUser.name}
          />
        )}
      </main>
    </>
  );
};

export default UserList;
