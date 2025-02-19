
const Loading = () => (
  <div className="fixed inset-0 min-h-[80vh] flex flex-col items-center justify-center gap-4 bg-gray-100 z-50">
    <div className="size-20 border-8 border-t-black border-gray-200 border-solid rounded-full animate-spin mt-4"></div>
    <span className="text-gray-800 text-xl font-semibold">Loading page, Please wait...</span>
  </div>
);

export default Loading;



// "use client";

// import { useEffect, useState } from 'react';

// const Loading = () => {
//   const [showLoading, setShowLoading] = useState(false);

//   useEffect(() => {
//     // Set a 3-second delay before showing the loading spinner
//     const timer = setTimeout(() => setShowLoading(true), 3000);

//     // Clear the timer when the component unmounts
//     return () => clearTimeout(timer);
//   }, []);

//   if (!showLoading) {
//     return null; // Don't render anything until 3 seconds have passed
//   }

//   return (
//     <div className="fixed inset-0 min-h-[80vh] flex flex-col items-center justify-center gap-4 bg-gray-100 z-50">
//       <div className="size-20 border-8 border-t-black border-gray-200 border-solid rounded-full animate-spin mt-4"></div>
//       <span className="text-gray-800 text-xl font-semibold">Loading page, Please wait...</span>
//     </div>
//   );
// };

// export default Loading;

