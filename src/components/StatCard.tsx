import {type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subText?: string;
}

const StatCard = ({ title, value, icon: Icon, subText }: StatCardProps) => {

  return (
    <div className='bg-white p-6 rounded-[2rem] border-l-[6px]'>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.15em] mb-1">
            {title}
          </p>
          <h3 className="text-3xl font-black text-gray-900 tracking-tighter">
            {typeof value === 'number' && title.toLowerCase().includes('revenue') 
              ? `₹${value.toLocaleString()}` 
              : value}
          </h3>
        </div>
        

        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center`}>
          {Icon && <Icon size={28} strokeWidth={2.5} />}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <p className="text-[10px] text-gray-400 font-medium">
          {subText}
        </p>
      </div>
      <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none">
         {Icon && <Icon size={80} strokeWidth={1} />}
      </div>
    </div>
  );
};

export default StatCard;