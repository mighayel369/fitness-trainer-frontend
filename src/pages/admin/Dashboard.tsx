import AdminTopBar from "../../layout/AdminTopBar"
import AdminSideBar from "../../layout/AdminSideBar"
import { useState ,useEffect} from "react"
import { dashboardService } from "../../services/dashboardService"
const Dashboard = () => {
  const [usersCount,setUsersCount]=useState(0)
  const [trainersCount,setTrainersCount]=useState(0)

useEffect(() => {
  document.title = "FitConnect | Dashboard";
}, []);

  useEffect(()=>{
   const getDashboardDatas=async ()=>{
    try{
      let response=await dashboardService.dashboardData()
      console.log(response)
        setUsersCount(response.usersCount)
        setTrainersCount(response.trainersCount)
    }catch{
      console.log('error')
    }
   }
   getDashboardDatas()
  },[])
  return (
    <>
      <AdminTopBar />
      <AdminSideBar />
      <main className="ml-64 mt-16 p-6">
        <h2 className="text-2xl font-bold mb-6">Welcome to the Dashboard</h2>

        <div className="flex gap-6">
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-lg font-semibold text-gray-700">Total Users</p>
            <h3 className="text-2xl font-bold text-blue-600 mt-2">{usersCount}</h3>
          </div>

          <div className="flex-1 bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-lg font-semibold text-gray-700">Total Trainers</p>
            <h3 className="text-2xl font-bold text-green-600 mt-2">{trainersCount}</h3>
          </div>

          <div className="flex-1 bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-lg font-semibold text-gray-700">Total Revenue</p>
            <h3 className="text-2xl font-bold text-purple-600 mt-2">$12,500</h3>
          </div>
        </div>
      </main>
    </>
  )
}

export default Dashboard
