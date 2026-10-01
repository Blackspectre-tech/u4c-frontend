import React, { useState, useCallback } from "react";
import Cropper, { Point } from "react-easy-crop";

interface Area {
  width: number;
  height: number;
  x: number;
  y: number;
}

interface LandscapeCropperProps {
  imageSrc: string;
  // Callback returns the pixel coordinates needed to generate the buffer
  onCropComplete: (croppedAreaPixels: Area) => void;
}

// ... (Your Area and LandscapeCropperProps interfaces)
const LandscapeCropper: React.FC<LandscapeCropperProps> = ({
  imageSrc,
  onCropComplete,
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // Track if the image resolution is sufficient
  const [isLowRes, setIsLowRes] = useState(false);

  const onMediaLoaded = (mediaSize: {
    naturalWidth: number;
    naturalHeight: number;
  }) => {
    if (mediaSize.naturalWidth < 2000) {
      setIsLowRes(true);
    } else {
      setIsLowRes(false);
    }
  };

  const onCropSave = useCallback((_area: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  return (
    <div className="relative h-full w-full bg-black">
      {/* Visual Warning Overlay */}
      {isLowRes && (
        <div className="absolute top-4 left-0 right-0 z-20 text-center pointer-events-none">
          <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse shadow-lg">
            ⚠️ Low Resolution: Image is less than 2000px wide
          </span>
        </div>
      )}

      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={16 / 5}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropSave}
        onMediaLoaded={onMediaLoaded}
        // STRETCHING: objectFit "cover" ensures it fills the crop area
        // If image is small, it will appear pixelated/stretched to the user
        objectFit="cover"
        style={{
          // Apply a visual cue if low res (e.g., slight blur or desaturation)
          mediaStyle: isLowRes ? { filter: "grayscale(0.5) opacity(0.8)" } : {},
          containerStyle: { background: "#1a1a1a" },
        }}
      />

      <button
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-6 py-3 rounded-md font-semibold text-white transition-all
          ${
            isLowRes
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-primary hover:bg-primary-shade"
          }`}
        disabled={isLowRes} // Optional: Disable button if too low res
        onClick={() => croppedAreaPixels && onCropComplete(croppedAreaPixels)}
      >
        {isLowRes
          ? "Image Too Small (Min `Width 2000px)"
          : "Confirm Landscape Crop"}
      </button>
    </div>
  );
};

export default LandscapeCropper;
