import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { cn } from "@/lib/utils";

export function WishlistButton({
  id,
  className,
  label,
}: {
  id: string;
  className?: string;
  label?: string;
}) {
  const { toggleWishlist, isWishlisted } = useStore();
  const active = isWishlisted(id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(id);
      }}
      aria-pressed={active}
      aria-label={active ? `Remove ${label ?? "item"} from wishlist` : `Add ${label ?? "item"} to wishlist`}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full bg-card/85 backdrop-blur-sm transition-colors hover:bg-card",
        className,
      )}
    >
      <motion.span
        key={String(active)}
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="flex"
      >
        <Heart
          className={cn("h-4 w-4 transition-colors", active ? "fill-primary text-primary" : "text-foreground")}
          strokeWidth={1.4}
        />
      </motion.span>
    </button>
  );
}