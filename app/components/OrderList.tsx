interface Order {
  id: string;
  status: string;
  details: string;
}

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-white shadow-lg rounded-md p-4">
          <h4 className="text-lg">{order.details}</h4>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderList;

