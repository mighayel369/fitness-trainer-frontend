

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminTopBar from "../../layout/AdminTopBar";
import AdminSideBar from "../../layout/AdminSideBar";
import Toast from "../../components/Toast";
import Modal from "../../components/Modal";
import GenericTable from "../../components/GenericTable";
import SearchInput from "../../components/SearchInput";
import Pagination from "../../components/Pagination";
import { adminUserService } from "../../services/admin/admin.User.service";

type User = {
  userId: string;
  name: string;
  email: string;
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
useEffect(() => {
  document.title = "FitConnect | User List";
}, []);
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await adminUserService.fetchUsers(page, search);
      setUsers(res.data || []);
      setTotalPages(res.total || 1);
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
    navigate(`/admin/users/${user.userId}`);
  };

  const handleModalOpen = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

const handleConfirmAction = async () => {
  if (!selectedUser) return;
  
  const targetId = selectedUser.userId;
  const targetStatus = !selectedUser.status;
  try {
    let res=await adminUserService.updateUserStatus(targetId, targetStatus);
      setUsers(prev => prev.map(u => u.userId === targetId ? { ...u, status: targetStatus } : u));
  setShowModal(false);
    setToastType("success");
    setToastMessage(res.message);
  } catch (error:any) {
    const message = error.response?.data?.message
    setToastType("error");
    setToastMessage(message||"Server error. Reverting changes.");
  } finally {
    setSelectedUser(null);
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
          <SearchInput value={search} onChange={setSearch} placeholder="Search users..." fullWidth={false} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
          <GenericTable<User>
            data={users}
            page={page}
            loading={loading}
            columns={[
              { header: "Name", accessor: "name" },
              { header: "Email", accessor: "email" },
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
          onPageChange={setPage}
        />
        </div>

        {selectedUser && (
          <Modal
            isVisible={showModal}
            onCancel={() => setShowModal(false)}
            onConfirm={handleConfirmAction}
            message={`Are you sure you want to ${selectedUser.status ? 'block' : 'unblock'} user`}
            title={selectedUser.name}
          />
        )}
      </main>
    </>
  );
};

export default UserList;
