import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface LightboxProps {
  images: { src: string; alt: string; title?: string; category?: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") onNext();
    if (e.key === "ArrowLeft") onPrev();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-primary/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 h-12 w-12 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center text-primary-foreground transition-colors"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 z-10 h-12 w-12 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center text-primary-foreground transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {/* Image container */}
      <div
        className="relative max-w-5xl max-h-[85vh] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />
        
        {/* Image info */}
        {(currentImage.title || currentImage.category) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-6 rounded-b-lg">
            {currentImage.title && (
              <h3 className="text-xl font-bold text-primary-foreground">
                {currentImage.title}
              </h3>
            )}
            {currentImage.category && (
              <p className="text-primary-foreground/70 text-sm mt-1">
                {currentImage.category}
              </p>
            )}
          </div>
        )}

        {/* Image counter */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-primary-foreground/60 text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 z-10 h-12 w-12 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center text-primary-foreground transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

interface GalleryImageProps {
  src: string;
  alt: string;
  title?: string;
  category?: string;
  onClick: () => void;
}

export function GalleryImage({ src, alt, title, category, onClick }: GalleryImageProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl cursor-pointer hover-lift"
      onClick={onClick}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {title && (
            <h3 className="text-lg font-bold text-primary-foreground">
              {title}
            </h3>
          )}
          {category && (
            <p className="text-primary-foreground/70 text-sm">
              {category}
            </p>
          )}
        </div>
        <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-[hsl(38_70%_50%)] flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
          <ZoomIn className="h-5 w-5 text-[hsl(240_15%_13%)]" />
        </div>
      </div>
    </div>
  );
}
