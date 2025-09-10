export const DetailCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 shadow-sm border border-gray-200">
    <div className="text-emerald-600 text-xl">{icon}</div>
    <div>
      <p className="font-medium text-gray-700">{label}</p>
      <p className="text-gray-800 text-sm mt-1">{value}</p>
    </div>
  </div>
);