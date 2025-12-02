import { Link } from "react-router-dom"

const AdminSideBar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-6 fixed top-16 left-0 flex flex-col gap-4 shadow-lg">
      <Link to="/admin" className="hover:text-yellow-400">Dashboard</Link>
      <Link to="/admin/trainers" className="hover:text-yellow-400">Trainers</Link>
      <Link to="/admin/users" className="hover:text-yellow-400">Users</Link>
      <Link to="/admin/services" className="hover:text-yellow-400">Services</Link>
      <Link to="/admin/wallet" className="hover:text-yellow-400">Wallet</Link>
    </aside>
  )
}

export default AdminSideBar