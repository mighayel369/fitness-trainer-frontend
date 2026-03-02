import {TrendingUp} from "lucide-react";
const StatCard = ({ title, value, icon: Icon, color, subText }: any) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <span className="text-green-500 text-xs font-bold flex items-center">
        <TrendingUp size={14} className="mr-1" /> +8%
      </span>
    </div>
    <p className="text-gray-500 text-sm font-medium">{title}</p>
    <h3 className="text-2xl font-black text-gray-800 mt-1">
      {typeof value === 'number' && title.includes('Earnings') ? `₹${value.toLocaleString()}` : value}
    </h3>
    <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-wider">{subText}</p>
  </div>
);

export default StatCard