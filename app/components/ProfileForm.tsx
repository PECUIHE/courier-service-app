import { useState } from 'react';

interface ProfileFormProps {
  phone: string;
  address: string;
  onSubmit: (phone: string, address: string) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ phone, address, onSubmit }) => {
  const [newPhone, setNewPhone] = useState(phone);
  const [newAddress, setNewAddress] = useState(address);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newPhone, newAddress);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="phone" className="block text-sm">Phone</label>
        <input
          type="text"
          id="phone"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm">Address</label>
        <input
          type="text"
          id="address"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">Save</button>
    </form>
  );
};

export default ProfileForm;

