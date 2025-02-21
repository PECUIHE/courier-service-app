"use client";

import dynamic from 'next/dynamic';

const LocationTracker = dynamic(() => import('@/app/components/LocationTracker'), { ssr: false });

export default function OrderStatus() {
  return (
    <div>
      {/* OrderStatus */}
      <LocationTracker />
    </div>
  );
}





// import LocationTracker from '@/app/components/LocationTracker'
// import React from 'react'

// export default function OrderStatus() {
//   return (
//     <div>
//       OrderStatus
//       <LocationTracker />
//     </div>
//   )
// }

