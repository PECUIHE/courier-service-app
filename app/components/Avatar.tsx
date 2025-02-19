import Image from 'next/image';
import React from 'react';

interface Profile {
  name: string;
  email: string;
  avatar_url: string;
}

interface AvatarProps {
  profile: Profile;
}

const Avatar: React.FC<AvatarProps> = ({ profile }) => {
  return (
    <div className="flex items-center space-x-4">
      <Image src={profile.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full" />
      <div>
        <h3 className="text-xl font-semibold">{profile.name}</h3>
        <p>{profile.email}</p>
      </div>
    </div>
  );
};

export default Avatar;

