'use client'

import { FC } from 'react';
import Image from 'next/image';

interface BorderedAvatarProps {
  src: string;
  alt: string;
  className?: string;
}

const BorderedAvatar: FC<BorderedAvatarProps> = ({
  src,
  alt,
  className = ''
}) => {
  return (
    <div className="p-1 rounded-full ring-2 ring-white/30">
      <div
        className={`relative w-8 h-8 rounded-full overflow-hidden ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="10px"
        />
      </div>
    </div>
  );
};

export default BorderedAvatar;
