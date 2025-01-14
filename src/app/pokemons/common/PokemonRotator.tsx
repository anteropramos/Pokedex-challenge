import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

interface PokemonRotatorProps {
  images: string | string[];
}

export const PokemonRotator = ({ images }: PokemonRotatorProps) => {
  const imageInverval = 1000;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevValue) => (prevValue + 1) % images.length);
      }, imageInverval);

      return () => clearInterval(timer);
    }
  }, [images, imageInverval]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Image
        src={images[currentIndex]}
        alt={`pokemon-image`}
        style={{ objectFit: 'contain' }}
        width={200}
        height={200}
      />
    </Box>
  );
};
