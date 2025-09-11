import AdminTopBar from "../../layout/AdminTopBar"
import AdminSideBar from "../../layout/AdminSideBar"

const Dashboard = () => {
  return (
    <>
      <AdminTopBar />
      <AdminSideBar />
      <main className="ml-64 mt-16 p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h2>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <p>Dashboard Contents</p>
        </div>
      </main>
    </>
  )
}

export default Dashboard