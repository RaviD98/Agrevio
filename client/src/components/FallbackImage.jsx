import React, { useState } from "react";

const FallbackImage = ({ src, alt, className = "" }) => {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setImageSrc("https://placehold.co/600x400?text=Agrevio")}
    />
  );
};

export default FallbackImage;
