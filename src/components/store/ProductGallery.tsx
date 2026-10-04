import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ProductGalleryProps = {
  images: string[];
  alt: string;
  isPlaceholder?: boolean;
};

export function ProductGallery({ images, alt, isPlaceholder }: ProductGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const multiple = images.length > 1;

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(images.length - 1, index));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: next * track.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
    setActive(next);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || !track.clientWidth) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    if (index !== active) setActive(index);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(active - 1);
    }
  };

  return (
    <div className="relative min-w-0">
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          tabIndex={multiple ? 0 : undefined}
          role="region"
          aria-roledescription="carousel"
          aria-label="Saree photos"
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, index) => (
            <div
              key={image}
              role="group"
              aria-roledescription="slide"
              aria-label={`Photo ${index + 1} of ${images.length}`}
              className="aspect-3/4 w-full shrink-0 snap-center snap-always"
            >
              <img
                src={image}
                alt={alt}
                draggable={false}
                decoding="async"
                loading={index === 0 ? "eager" : "lazy"}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        {multiple && (
          <>
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center bg-background/85 text-foreground transition-opacity hover:bg-background disabled:pointer-events-none disabled:opacity-0"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active === images.length - 1}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center bg-background/85 text-foreground transition-opacity hover:bg-background disabled:pointer-events-none disabled:opacity-0"
            >
              <ChevronRight className="size-5" />
            </button>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 right-3 bg-foreground/80 px-2.5 py-1 text-xs text-background"
            >
              {active + 1} / {images.length}
            </span>
          </>
        )}
        {isPlaceholder && (
          <span className="pointer-events-none absolute right-3 top-3 bg-foreground/85 px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-background">
            SAMPLE IMAGE
          </span>
        )}
      </div>
      {multiple && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`View photo ${index + 1}`}
              aria-current={index === active}
              className={`overflow-hidden border-2 transition-colors ${index === active ? "border-primary" : "border-transparent"}`}
            >
              <img
                src={image}
                alt=""
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
