// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// interface GernericAreaChartProps{
//     data:any[],
//     xKey:string,
//     yKey:string,
//     color?:string,
//     height?:number
// }

// export const GenericAreaChart = ({ 
//   data, 
//   xKey, 
//   yKey, 
//   color = "#4F46E5", 
//   height = 250 
// }: GernericAreaChartProps) => {
//   return (
//     <div style={{ height, width: '100%' }}>
//       <ResponsiveContainer width="100%" height="100%">
//         <AreaChart data={data}>
//           <defs>
//             <linearGradient id={`gradient-${yKey}`} x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
//               <stop offset="95%" stopColor={color} stopOpacity={0}/>
//             </linearGradient>
//           </defs>
//           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
//           <XAxis 
//             dataKey={xKey} 
//             axisLine={false} 
//             tickLine={false} 
//             tick={{fontSize: 10, fill: '#94A3B8'}}
//           />
//           <YAxis 
//             axisLine={false} 
//             tickLine={false} 
//             tick={{fontSize: 10, fill: '#94A3B8'}} 
//           />
//           <Tooltip 
//             contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
//           />
//           <Area 
//             type="monotone" 
//             dataKey={yKey} 
//             stroke={color} 
//             fillOpacity={1} 
//             fill={`url(#gradient-${yKey})`} 
//             strokeWidth={3}
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };



import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SeriesConfig {
  key: string;
  color: string;
  name: string;
}

interface GenericAreaChartProps {
  data: any[];
  xKey: string;
  series: SeriesConfig[]; 
  height?: number;
}

export const GenericAreaChart = ({ 
  data, 
  xKey, 
  series, 
  height = 300 
}: GenericAreaChartProps) => {
  return (
    <div style={{ height, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            {series.map((s) => (
              <linearGradient key={s.key} id={`gradient-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={s.color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={s.color} stopOpacity={0}/>
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis 
            dataKey={xKey} 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 10, fill: '#94A3B8'}}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 10, fill: '#94A3B8'}} 
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          
          {series.map((s) => (
            <Area 
              key={s.key}
              type="monotone" 
              dataKey={s.key} 
              name={s.name}
              stroke={s.color} 
              fillOpacity={1} 
              fill={`url(#gradient-${s.key})`} 
              strokeWidth={3}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};