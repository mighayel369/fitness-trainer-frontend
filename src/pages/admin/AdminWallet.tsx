import AdminTopBar from "../../layout/AdminTopBar";
import AdminSideBar from "../../layout/AdminSideBar";
import { useEffect, useState } from "react";
import GenericTable from "../../components/GenericTable";
import { adminWalletService } from "../../services/admin/admin.Wallet.service";
import { useNavigate } from "react-router-dom";
import { getAdminWalletColumns } from "../../constants/TableColumns/AdminWalletColumns";
import { FaHistory } from "react-icons/fa";
import Pagination from "../../components/Pagination";
const AdminWallet = () => {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const walletColumns = getAdminWalletColumns(navigate);

  useEffect(() => {
    document.title = "FitTribe | Admin Wallet";
    fetchAdminWallet();
  }, []);

  const fetchAdminWallet = async () => {
    try {
      setLoading(true);
      const res = await adminWalletService.getAdminWallet(page,5);
      console.log(res)
      if (res?.success) {
        const walletData = res.data[0];
        setWallet(walletData);
        setTotalPages(res.total);
      }
    } catch (err) {
      console.error("Failed to load admin wallet", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminTopBar />
      <AdminSideBar />

      <main className="ml-64 pt-20 px-8 pb-12">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">
            Platform Treasury
          </h2>
          <p className="text-gray-500 text-sm">Monitor platform revenue and transaction flows</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-900 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Net Platform Balance</p>
            <h3 className="text-4xl font-black">₹{wallet?.balance ?? 0}</h3>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg text-gray-600"><FaHistory /></div>
            <h3 className="text-lg font-black text-gray-800 uppercase tracking-tighter">
              Transaction
            </h3>
          </div>

          <GenericTable
            columns={walletColumns}
            data={wallet?.transactions || []}
            page={1}
            loading={loading}
            emptyMessage="No  transactions recorded found"
          />
          {totalPages >= 1 && (
            <div className="p-6 border-t border-gray-50">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminWallet;