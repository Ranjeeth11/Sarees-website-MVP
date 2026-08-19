import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = { id: string; size: string; qty: number };

type StoreValue = {
  cart: CartItem[];
  wishlist: string[];
  cartCount: number;
  addToCart: (id: string, size?: string, qty?: number) => void;
  removeFromCart: (id: string, size: string) => void;
  setQty: (id: string, size: string, qty: number) => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

const KEY = "tse-store-v1";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { cart?: CartItem[]; wishlist?: string[] };
        setCart(parsed.cart ?? []);
        setWishlist(parsed.wishlist ?? []);
      }
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(KEY, JSON.stringify({ cart, wishlist }));
  }, [cart, wishlist, loaded]);

  const addToCart = useCallback((id: string, size = "One size", qty = 1) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === id && i.size === size);
      if (found) {
        return prev.map((i) =>
          i.id === id && i.size === size ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...prev, { id, size, qty }];
    });
  }, []);

  const removeFromCart = useCallback((id: string, size: string) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  }, []);

  const setQty = useCallback((id: string, size: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => !(i.id === id && i.size === size))
        : prev.map((i) => (i.id === id && i.size === size ? { ...i, qty } : i)),
    );
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id],
    );
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      cart,
      wishlist,
      cartCount: cart.reduce((n, i) => n + i.qty, 0),
      addToCart,
      removeFromCart,
      setQty,
      toggleWishlist,
      isWishlisted: (id: string) => wishlist.includes(id),
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
    }),
    [cart, wishlist, cartOpen, searchOpen, addToCart, removeFromCart, setQty, toggleWishlist],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}