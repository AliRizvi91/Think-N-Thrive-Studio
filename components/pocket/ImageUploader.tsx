"use client"
import { useState, useEffect, useRef, memo, ReactNode } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store'; 

interface ImageUploaderProps {
  updateImageForm?: boolean;
  defaultImage?: string | null;
  defaultImageComponent?: ReactNode;
  onImageSelect?: (file: File) => void;
  width?: string;
  height?: string;
  resetTrigger?: boolean;
}

const ImageUploader = memo(({
  updateImageForm,
  defaultImage,
  defaultImageComponent,
  onImageSelect,
  width = '120px',
  height = '120px',
  resetTrigger
}: ImageUploaderProps) => {
  const [image, setImage] = useState<string | null>(defaultImage || null);
  const inputRef = useRef<HTMLInputElement>(null);
  // const user = useSelector((state: RootState) => state.StoreOfUser?.user || null);
  
  // Reset image when resetTrigger changes
  useEffect(() => {
    if (resetTrigger) {
      if (image?.startsWith("blob:")) {
        URL.revokeObjectURL(image);
      }
      setImage(null);
    }
  }, [resetTrigger, image]);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (image?.startsWith("blob:")) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newImage = URL.createObjectURL(file);
      // cleanup previous blob before setting a new one
      if (image?.startsWith("blob:")) {
        URL.revokeObjectURL(image);
      }
      setImage(newImage);
      onImageSelect?.(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        ref={inputRef}
      />
      
      <div
        style={{
          backgroundImage: image ? `url(${image})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width,
          height,
          borderRadius: '50%',
          backgroundColor: 'transparent',
        }}
        className="shadow-[2px_5px_15px_rgba(0,0,0,0.2)]"
        onClick={handleClick}
      >
        {!image && defaultImageComponent}
      </div>
    </div>
  );
});

ImageUploader.displayName = 'ImageUploader';

export default ImageUploader;