const Notifications: React.FC<{ notifications: string[] }> = ({ notifications }) => {
    return (
      <div className="space-y-2">
        {notifications.map((notification, index) => (
          <div key={index} className="bg-gray-200 p-3 rounded-lg">
            {notification}
          </div>
        ))}
      </div>
    );
  };
  
  export default Notifications;

  