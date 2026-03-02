import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PieChartProps {
  data: { label: string; count: number }[];
  colors?: Record<string, string>;
}

export const GenericPieChart = ({ data, colors = {} }: PieChartProps) => {
  const defaultColors: Record<string, string> = {
    completed: "#1bdf2b", 
    cancelled: "#F43F5E", 
    pending: "#F59E0B",
    confirmed:"#6ad8b3",
     rejected:"#ce2c2c",
    default: "#21b966"  
  };

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="count"
            nameKey="label"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[entry.label.toLowerCase()] || defaultColors[entry.label.toLowerCase()] || defaultColors.default} 
              />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};