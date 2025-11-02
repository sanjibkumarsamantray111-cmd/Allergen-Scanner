// import { TrendingUp, AlertTriangle, CheckCircle2, Scan } from "lucide-react";
// import { Card } from "../ui/card";
// import { motion } from "motion/react";

// export function OverviewStats() {
//   const stats = [
//     {
//       label: "Total Scans",
//       value: "1,247",
//       change: "+12.5%",
//       icon: Scan,
//       color: "from-[#7fb093] to-[#a8c9b4]",
//       bgColor: "bg-[#7fb093]/10",
//     },
//     {
//       label: "Allergens Detected",
//       value: "23",
//       change: "-8.3%",
//       icon: AlertTriangle,
//       color: "from-[#f59e0b] to-[#fbbf24]",
//       bgColor: "bg-[#f59e0b]/10",
//     },
//     {
//       label: "Safe Foods",
//       value: "94.2%",
//       change: "+3.1%",
//       icon: CheckCircle2,
//       color: "from-[#10b981] to-[#34d399]",
//       bgColor: "bg-[#10b981]/10",
//     },
//     {
//       label: "Risk Alerts",
//       value: "5",
//       change: "-2",
//       icon: TrendingUp,
//       color: "from-[#ef4444] to-[#f87171]",
//       bgColor: "bg-[#ef4444]/10",
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {stats.map((stat, index) => {
//         const Icon = stat.icon;
//         return (
//           <motion.div
//             key={stat.label}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <Card className="p-6 bg-white/50 backdrop-blur-xl border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//               <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                   <p className="text-sm text-[#5a8268] mb-2">{stat.label}</p>
//                   <h3 className="text-[#2d5a3d] mb-1">{stat.value}</h3>
//                   <div className="flex items-center gap-2">
//                     <span
//                       className={`text-sm ${
//                         stat.change.startsWith("+")
//                           ? "text-[#10b981]"
//                           : stat.change.startsWith("-") && stat.label === "Allergens Detected"
//                           ? "text-[#10b981]"
//                           : "text-[#ef4444]"
//                       }`}
//                     >
//                       {stat.change}
//                     </span>
//                     <span className="text-xs text-[#5a8268]">vs last month</span>
//                   </div>
//                 </div>
//                 <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
//                   <Icon className="w-6 h-6 text-white" />
//                 </div>
//               </div>
//             </Card>
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// }

// export function SafetyProgress() {
//   return (
//     <Card className="p-8 bg-white/50 backdrop-blur-xl border-white/60 shadow-lg">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h4 className="text-[#2d5a3d] mb-1">Food Safety Score</h4>
//           <p className="text-sm text-[#5a8268]">Based on recent scans</p>
//         </div>
//         <div className="relative w-32 h-32">
//           <svg className="w-full h-full -rotate-90">
//             <circle
//               cx="64"
//               cy="64"
//               r="56"
//               fill="none"
//               stroke="#e8f0ea"
//               strokeWidth="8"
//             />
//             <circle
//               cx="64"
//               cy="64"
//               r="56"
//               fill="none"
//               stroke="url(#gradient)"
//               strokeWidth="8"
//               strokeDasharray={`${94.2 * 3.51} 351.86`}
//               strokeLinecap="round"
//               className="transition-all duration-1000"
//             />
//             <defs>
//               <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="#10b981" />
//                 <stop offset="100%" stopColor="#34d399" />
//               </linearGradient>
//             </defs>
//           </svg>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center">
//               <p className="text-2xl font-bold text-[#2d5a3d]">94.2%</p>
//               <p className="text-xs text-[#5a8268]">Safe</p>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div className="space-y-4">
//         <div>
//           <div className="flex justify-between text-sm mb-2">
//             <span className="text-[#5a8268]">Gluten-Free</span>
//             <span className="text-[#2d5a3d]">98%</span>
//           </div>
         
//         </div>
//         <div>
//           <div className="flex justify-between text-sm mb-2">
//             <span className="text-[#5a8268]">Dairy-Free</span>
//             <span className="text-[#2d5a3d]">92%</span>
//           </div>
         
//         </div>
//         <div>
//           <div className="flex justify-between text-sm mb-2">
//             <span className="text-[#5a8268]">Nut-Free</span>
//             <span className="text-[#2d5a3d]">87%</span>
//           </div>
         
//         </div>
//       </div>
//     </Card>
//   );
// }
