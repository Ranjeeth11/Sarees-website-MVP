import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Upload, LogOut } from "lucide-react";
import { type Product } from "@/data/products";
import { CategoryManager } from "@/components/admin/CategoryManager";
import { catalogueKey, supabase, useCatalogue, useCategories } from "@/lib/catalogue";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Manage sarees | The Saree Edit" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Admin,
});
const inputClass =
  "mt-2 w-full rounded-md border border-border bg-background px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary";
const buttonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground disabled:opacity-50";
const blank = {
  name: "",
  description: "",
  price: "",
  category: "",
  fabric: "",
  color: "",
  available: true,
  featured: false,
};

function Admin() {
  const [access, setAccess] = useState<"loading" | "login" | "denied" | "admin">("loading");
  const [authError, setAuthError] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  useEffect(() => {
    if (!supabase) return;
    const client = supabase;
    let active = true;
    let version = 0;
    async function check() {
      const current = ++version;
      const {
        data: { session },
        error,
      } = await client.auth.getSession();
      if (!active || current !== version) return;
      if (error || !session) {
        setAccess("login");
        return;
      }
      const { data, error: membershipError } = await client
        .from("admin_users")
        .select("user_id")
        .eq("user_id", session.user.id)
        .maybeSingle();
      if (active && current === version) {
        setAccess(data && !membershipError ? "admin" : "denied");
        if (membershipError)
          setAuthError("Unable to verify admin access. Check your connection and database setup.");
      }
    }
    void check();
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(() => {
      setTimeout(() => {
        if (active) void check();
      }, 0);
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthBusy(true);
    setAuthError("");
    const form = new FormData(event.currentTarget);
    try {
      const { error } = await supabase!.auth.signInWithPassword({
        email: String(form.get("email")).trim(),
        password: String(form.get("password")),
      });
      if (error) throw error;
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setAuthBusy(false);
    }
  }
  async function logout() {
    setAuthError("");
    const { error } = await supabase!.auth.signOut();
    if (error) setAuthError(error.message);
    else setAccess("login");
  }
  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-28 md:px-8 md:pt-36">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="eyebrow">The Saree Edit · Admin</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Your saree collection</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Add beautiful pieces and keep your catalogue up to date.
          </p>
        </div>
        <div className="flex items-center gap-5">
          <Link to="/collections" className="text-sm underline">
            View store
          </Link>
          {supabase && (access === "admin" || access === "denied") && (
            <button
              onClick={() => {
                void logout();
              }}
              className="flex min-h-11 items-center gap-2 text-sm"
            >
              <LogOut size={16} /> Sign out
            </button>
          )}
        </div>
      </div>
      {!supabase ? (
        <div className="max-w-xl rounded-lg border bg-secondary/30 p-8">
          <h2 className="font-display text-2xl">Connect your catalogue</h2>
          <p className="mt-3 text-sm leading-7">
            Admin setup is ready. Configure your Supabase project and admin account using the steps
            in README.md, then restart the app.
          </p>
        </div>
      ) : access === "loading" ? (
        <p role="status">Checking admin access…</p>
      ) : access === "login" ? (
        <form onSubmit={login} className="mx-auto max-w-md rounded-lg border p-8">
          <h2 className="font-display text-2xl">Admin sign in</h2>
          <label className="mt-6 block text-sm">
            Email
            <input
              name="email"
              type="email"
              autoComplete="username"
              required
              className={inputClass}
            />
          </label>
          <label className="mt-4 block text-sm">
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={inputClass}
            />
          </label>
          {authError && (
            <p role="alert" className="mt-4 text-sm text-red-700">
              {authError}
            </p>
          )}
          <button disabled={authBusy} className={`${buttonClass} mt-6 w-full`}>
            {authBusy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      ) : access === "denied" ? (
        <div role="alert" className="rounded-lg border p-8">
          <h2 className="font-display text-2xl">Admin access required</h2>
          <p className="mt-3">This account has not been granted permission to manage sarees.</p>
          {authError && <p className="mt-3 text-red-700">{authError}</p>}
        </div>
      ) : (
        <>
          <CategoryManager />
          <CatalogueManager />
          {authError && (
            <p role="alert" className="mt-4 text-red-700">
              {authError}
            </p>
          )}
        </>
      )}
    </div>
  );
}

function CatalogueManager() {
  const { data: products = [], isPending, isError, refetch } = useCatalogue();
  const {
    data: categories = [],
    isPending: categoriesPending,
    isError: categoriesError,
    refetch: refetchCategories,
  } = useCategories();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blank);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<Product | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);
  useEffect(() => {
    if (!open) return;
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [open, editing?.id]);
  function edit(product: Product | null) {
    setEditing(product);
    setFiles([]);
    setError("");
    setMessage("");
    setForm(
      product
        ? {
            name: product.name,
            description: product.description,
            price: String(product.price ?? ""),
            category: product.category,
            fabric: product.fabric,
            color: product.color,
            available: product.available,
            featured: product.featured,
          }
        : { ...blank, category: categories[0]?.name ?? "" },
    );
    setOpen(true);
  }
  async function refresh() {
    await queryClient.invalidateQueries({ queryKey: catalogueKey });
  }
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    const price = Number(form.price);
    if (!form.price.trim() || !Number.isFinite(price) || price < 0) {
      setError("Enter a valid price.");
      return;
    }
    if (![form.name, form.description, form.fabric, form.color].every((value) => value.trim())) {
      setError("Complete all product details.");
      return;
    }
    if (!categories.some((category) => category.name === form.category)) {
      setError("Select an existing category. It may have been renamed or deleted.");
      return;
    }
    if (!files.length && !editing?.imagePath) {
      setError("Upload a saree photo.");
      return;
    }
    if (files.length > 8) {
      setError("Upload up to 8 images for one saree.");
      return;
    }
    setBusy(true);
    const uploaded: string[] = [];
    try {
      const client = supabase!;
      let imagePaths = editing?.images?.length
        ? editing.images.map((image) => image.split("/saree-images/")[1] ?? image)
        : editing?.imagePath
          ? [editing.imagePath]
          : [];
      if (files.length) {
        const extensions: Record<string, string> = {
          "image/jpeg": "jpg",
          "image/png": "png",
          "image/webp": "webp",
        };
        imagePaths = [];
        for (const file of files) {
          if (!extensions[file.type] || file.size > 5 * 1024 * 1024 || !file.size)
            throw new Error("Choose JPG, PNG or WebP images up to 5 MB each.");
          const path = `${crypto.randomUUID()}.${extensions[file.type]}`;
          const { error: uploadError } = await client.storage
            .from("saree-images")
            .upload(path, file, { contentType: file.type });
          if (uploadError) throw uploadError;
          uploaded.push(path);
          imagePaths.push(path);
        }
      }
      const imagePath = imagePaths[0];
      if (!imagePath) throw new Error("Upload at least one saree photo.");
      const row = {
        ...form,
        name: form.name.trim(),
        description: form.description.trim(),
        fabric: form.fabric.trim(),
        color: form.color.trim(),
        price,
        image_path: imagePath,
      };
      const result = editing
        ? await client.from("products").update(row).eq("id", editing.id).select("id").single()
        : await client.from("products").insert(row).select("id").single();
      if (result.error) throw result.error;
      const productId = editing?.id ?? result.data.id;
      const { error: galleryDeleteError } = await client
        .from("product_images")
        .delete()
        .eq("product_id", productId);
      if (galleryDeleteError)
        throw new Error(
          "Run the product images migration in Supabase before saving multiple photos.",
        );
      const { error: galleryInsertError } = await client.from("product_images").insert(
        imagePaths.map((path, index) => ({
          product_id: productId,
          image_path: path,
          sort_order: index,
        })),
      );
      if (galleryInsertError) throw galleryInsertError;
      let cleanupWarning = "";
      const oldPaths =
        editing?.images?.map((image) => image.split("/saree-images/")[1] ?? image) ??
        (editing?.imagePath ? [editing.imagePath] : []);
      const pathsToRemove = oldPaths.filter((path) => !imagePaths.includes(path));
      if (pathsToRemove.length) {
        const { error: cleanupError } = await client.storage
          .from("saree-images")
          .remove(pathsToRemove);
        if (cleanupError) cleanupWarning = " The previous photo could not be removed from storage.";
      }
      setOpen(false);
      setFiles([]);
      setEditing(null);
      setMessage(`Saree ${editing ? "updated" : "added"} successfully.${cleanupWarning}`);
      await refresh();
    } catch (error) {
      if (uploaded.length) await supabase!.storage.from("saree-images").remove(uploaded);
      setError(
        error instanceof Error ? error.message : "Could not save the saree. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function remove() {
    if (!deleting) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const { error: deleteError } = await supabase!
        .from("products")
        .delete()
        .eq("id", deleting.id)
        .select("id")
        .single();
      if (deleteError) throw deleteError;
      let cleanupWarning = "";
      const paths =
        deleting.images?.map((image) => image.split("/saree-images/")[1] ?? image) ??
        (deleting.imagePath ? [deleting.imagePath] : []);
      if (paths.length) {
        const { error: cleanupError } = await supabase!.storage.from("saree-images").remove(paths);
        if (cleanupError) cleanupWarning = " Its photo could not be removed from storage.";
      }
      setDeleting(null);
      setMessage(`Saree deleted.${cleanupWarning}`);
      await refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not delete saree.");
    } finally {
      setBusy(false);
    }
  }
  const filtered = products.filter((p) =>
    `${p.name} ${p.category} ${p.color}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <div className="mb-8 grid grid-cols-3 gap-3">
        {[
          ["Total sarees", products.length],
          ["Available", products.filter((p) => p.available).length],
          ["Featured", products.filter((p) => p.featured).length],
        ].map(([label, count]) => (
          <div key={label} className="rounded-lg border bg-secondary/30 p-4 md:p-6">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-2 font-display text-3xl">{count}</p>
          </div>
        ))}
      </div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <label className="w-full max-w-sm text-sm">
          Search sarees
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, colour or category"
            className={inputClass}
          />
        </label>
        <button
          disabled={busy || categoriesPending || categoriesError || !categories.length}
          onClick={() => edit(null)}
          className={buttonClass}
        >
          <Plus size={18} /> Add saree
        </button>
      </div>
      {categoriesError && (
        <p role="alert" className="mb-5 text-red-700">
          Could not load categories.{" "}
          <button
            onClick={() => {
              void refetchCategories();
            }}
            className="underline"
          >
            Try again
          </button>
        </p>
      )}
      {!categoriesPending && !categoriesError && !categories.length && (
        <p className="mb-5 text-sm text-muted-foreground">
          Create a category above before adding a saree.
        </p>
      )}
      {message && (
        <p role="status" className="mb-5 rounded-md bg-green-50 p-4 text-sm text-green-800">
          {message}
        </p>
      )}
      {error && (
        <p role="alert" className="mb-5 rounded-md bg-red-50 p-4 text-sm text-red-800">
          {error}
        </p>
      )}
      {open && (
        <form
          ref={formRef}
          onSubmit={save}
          className="mb-10 scroll-mt-28 rounded-lg border bg-secondary/20 p-5 md:p-8"
        >
          <h2 className="mb-6 font-display text-3xl">
            {editing ? "Edit saree" : "Add a new saree"}
          </h2>
          <fieldset disabled={busy} className="grid gap-8 md:grid-cols-[280px_1fr]">
            <div>
              {previews.length || editing?.images?.length || editing?.image ? (
                <div className="mb-4 grid grid-cols-2 gap-2">
                  {(previews.length
                    ? previews
                    : editing?.images?.length
                      ? editing.images
                      : [editing?.image]
                  )
                    .filter(Boolean)
                    .map((image, index) => (
                      <img
                        key={`${image}-${index}`}
                        src={image}
                        alt={`Saree preview ${index + 1}`}
                        className="aspect-3/4 w-full rounded-md object-cover"
                      />
                    ))}
                </div>
              ) : (
                <div className="mb-4 flex aspect-3/4 items-center justify-center rounded-md border border-dashed bg-background text-muted-foreground">
                  <Upload size={36} />
                </div>
              )}
              <label className="block text-sm font-medium">
                Saree photos
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  className="mt-3 block w-full text-xs file:mr-2 file:rounded file:border-0 file:bg-primary file:p-2 file:text-primary-foreground"
                  onChange={(e) => {
                    setFiles(Array.from(e.target.files ?? []));
                  }}
                />
              </label>
              <p className="mt-3 text-xs text-muted-foreground">
                Select up to 8 JPG, PNG or WebP images. Maximum 5 MB each. The first image is the
                main product image.
              </p>
            </div>
            <div className="grid content-start gap-5 sm:grid-cols-2">
              <label className="text-sm sm:col-span-2">
                Saree name
                <input
                  required
                  maxLength={160}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                  placeholder="Kalamkari print saree"
                />
              </label>
              <label className="text-sm">
                Price (₹)
                <input
                  required
                  type="number"
                  min="0"
                  max="99999999.99"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className={inputClass}
                  placeholder="850"
                />
              </label>
              <label className="text-sm">
                Category
                <select
                  required
                  value={
                    categories.some((category) => category.name === form.category)
                      ? form.category
                      : ""
                  }
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value as Product["category"] })
                  }
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                Fabric
                <input
                  required
                  maxLength={160}
                  value={form.fabric}
                  onChange={(e) => setForm({ ...form, fabric: e.target.value })}
                  className={inputClass}
                  placeholder="Soft cotton"
                />
              </label>
              <label className="text-sm">
                Colour
                <input
                  required
                  maxLength={160}
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className={inputClass}
                  placeholder="Green and gold"
                />
              </label>
              <label className="text-sm sm:col-span-2">
                Description
                <textarea
                  required
                  maxLength={5000}
                  rows={5}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className={inputClass}
                  placeholder="Describe the weave, border, blouse piece and care instructions…"
                />
              </label>
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.available}
                  onChange={(e) => setForm({ ...form, available: e.target.checked })}
                />{" "}
                Available in stock
              </label>
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                />{" "}
                Featured on homepage
              </label>
              <div className="flex gap-4 sm:col-span-2">
                <button className={buttonClass}>
                  {busy ? "Saving…" : editing ? "Save changes" : "Add to catalogue"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setFiles([]);
                    setError("");
                  }}
                  className="px-4 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      )}
      {deleting && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-5" role="alert">
          <p>
            Delete <strong>{deleting.name}</strong> and its photo? This cannot be undone.
          </p>
          <div className="mt-4 flex gap-4">
            <button
              disabled={busy}
              onClick={() => {
                void remove();
              }}
              className={buttonClass}
            >
              {busy ? "Deleting…" : "Confirm delete"}
            </button>
            <button disabled={busy} onClick={() => setDeleting(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {isPending ? (
        <p role="status">Loading catalogue…</p>
      ) : isError ? (
        <div role="alert">
          Could not load catalogue.{" "}
          <button
            onClick={() => {
              void refetch();
            }}
            className="underline"
          >
            Try again
          </button>
        </div>
      ) : !filtered.length ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <h2 className="font-display text-2xl">
            {search ? "No matching sarees" : "Your collection starts here"}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {search
              ? "Try another search."
              : "Add your first saree with a photo, price and description."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-lg border">
              <div className="flex gap-4 p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-36 w-24 rounded object-cover"
                />
                <div>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                  <h2 className="mt-1 font-display text-xl">{product.name}</h2>
                  <p className="mt-2 text-sm">₹{product.price?.toLocaleString("en-IN")}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {product.available ? "In stock" : "Sold out"}
                    {product.featured ? " · Featured" : ""}
                  </p>
                </div>
              </div>
              <div className="flex border-t">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => edit(product)}
                  className="flex min-h-12 flex-1 items-center justify-center gap-2 text-sm"
                >
                  <Pencil size={15} /> Edit
                </button>
                <button
                  disabled={busy}
                  onClick={() => {
                    setDeleting(product);
                    setError("");
                  }}
                  className="flex min-h-12 flex-1 items-center justify-center gap-2 border-l text-sm text-red-700"
                >
                  <Trash2 size={15} /> Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
