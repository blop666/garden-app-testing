// // components/dashboard/WaterButton.tsx

// 'use client';

// import { Droplets, Loader2 } from 'lucide-react';
// import { useState } from 'react';
// // import { sendWaterCommand } from '@/lib/thingspeak';

// interface WaterButtonProps {
//   onWaterSuccess: () => void;
// }

// export default function WaterButton({ onWaterSuccess }: WaterButtonProps) {
//   const [isWatering, setIsWatering] = useState(false);

//   const handleWater = async () => {
//     setIsWatering(true);
//     const success = await sendWaterCommand();
    
//     if (success) {
//       // Wait 5 seconds then refresh data
//       setTimeout(() => {
//         onWaterSuccess();
//         setIsWatering(false);
//       }, 5000);
//     } else {
//       setIsWatering(false);
//       alert('Failed to send water command. Please try again.');
//     }
//   };

//   return (
//     <button
//       onClick={handleWater}
//       disabled={isWatering}
//       className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-6 px-8 rounded-2xl shadow-xl transition-all duration-200 hover:scale-105 disabled:scale-100 flex items-center justify-center gap-3 text-xl"
//     >
//       {isWatering ? (
//         <>
//           <Loader2 className="w-7 h-7 animate-spin" />
//           Watering Plant...
//         </>
//       ) : (
//         <>
//           <Droplets className="w-7 h-7" />
//           💦 Water Plant Now
//         </>
//       )}
//     </button>
//   );
// }