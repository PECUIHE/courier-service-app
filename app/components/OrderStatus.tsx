import React from 'react';

const OrderStatus: React.FC<{ status: string }> = ({ status }) => {
  return (
    <div className="bg-green-100 p-4 rounded-md">
      <h3 className="font-semibold">Order Status: {status}</h3>
    </div>
  );
};

export default OrderStatus;

