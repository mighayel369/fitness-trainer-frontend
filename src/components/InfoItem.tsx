export const InfoItem = ({ icon, label, value }: any) => (
  <div className="flex items-center space-x-3">
    {icon}
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-gray-800 font-medium">{value}</p>
    </div>
  </div>
);