import { useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import {
  catalogueKey,
  categoriesKey,
  supabase,
  useCatalogue,
  useCategories,
  type CatalogueCategory,
} from "@/lib/catalogue";

export function CategoryManager() {
  const { data: categories = [], isPending, isError, refetch } = useCategories();
  const {
    data: products = [],
    isPending: productsPending,
    isError: productsError,
  } = useCatalogue();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<CatalogueCategory | null>(null);
  const [name, setName] = useState("");
  const [deleting, setDeleting] = useState<CatalogueCategory | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function refresh() {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: categoriesKey }),
      queryClient.invalidateQueries({ queryKey: catalogueKey }),
    ]);
  }
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    const trimmed = name.trim();
    if (!trimmed || trimmed.length > 80) {
      setError("Enter a category name between 1 and 80 characters.");
      return;
    }
    if (
      categories.some(
        (category) =>
          category.id !== editing?.id && category.name.toLowerCase() === trimmed.toLowerCase(),
      )
    ) {
      setError("A category with this name already exists.");
      return;
    }
    setBusy(true);
    try {
      const result = editing
        ? await supabase!
            .from("categories")
            .update({ name: trimmed })
            .eq("id", editing.id)
            .select("id")
            .single()
        : await supabase!.from("categories").insert({ name: trimmed }).select("id").single();
      if (result.error) {
        if (result.error.code === "23505")
          throw new Error("A category with this name already exists.");
        throw result.error;
      }
      setMessage(
        editing ? "Category updated. Assigned sarees now use the new name." : "Category created.",
      );
      setEditing(null);
      setName("");
      await refresh();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not save category. Please try again.",
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
      const { error } = await supabase!
        .from("categories")
        .delete()
        .eq("id", deleting.id)
        .select("id")
        .single();
      if (error) {
        if (error.code === "23503" || error.code === "23001")
          throw new Error("Move or delete the sarees in this category before deleting it.");
        throw error;
      }
      if (editing?.id === deleting.id) {
        setEditing(null);
        setName("");
      }
      setDeleting(null);
      setMessage("Category deleted.");
      await refresh();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not delete category. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <section
      className="mb-10 rounded-lg border bg-secondary/20 p-5 md:p-8"
      aria-labelledby="categories-heading"
    >
      <h2 id="categories-heading" className="font-display text-3xl">
        Categories
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Organise your collection. Move sarees to another category before deleting a category in use.
      </p>
      {isPending ? (
        <p className="mt-5" role="status">
          Loading categories…
        </p>
      ) : isError ? (
        <p className="mt-5" role="alert">
          Could not load categories.{" "}
          <button
            className="underline"
            onClick={() => {
              void refetch();
            }}
          >
            Try again
          </button>
        </p>
      ) : (
        <>
          <form onSubmit={save} className="mt-6 flex flex-wrap items-end gap-3">
            <label className="w-full max-w-sm text-sm">
              {editing ? "Edit category name" : "New category name"}
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                maxLength={80}
                disabled={busy}
                placeholder="e.g. Organza"
                className="mt-2 w-full rounded-md border bg-background px-3 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
            <button
              disabled={busy}
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm text-primary-foreground disabled:opacity-50"
            >
              <Plus size={16} />
              {busy ? "Saving…" : editing ? "Save category" : "Create category"}
            </button>
            {editing && (
              <button
                type="button"
                disabled={busy}
                onClick={() => {
                  setEditing(null);
                  setName("");
                  setError("");
                }}
                className="min-h-11 px-3 text-sm"
              >
                Cancel edit
              </button>
            )}
          </form>
          <ul className="mt-6 divide-y rounded-md border bg-background">
            {categories.map((category) => {
              const count = products.filter((product) => product.category === category.name).length;
              const usageUnknown = productsPending || productsError;
              return (
                <li
                  key={category.id}
                  className="flex flex-wrap items-center justify-between gap-4 p-4"
                >
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {usageUnknown
                        ? "Saree count unavailable"
                        : `${count} ${count === 1 ? "saree" : "sarees"}`}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      disabled={busy}
                      onClick={() => {
                        setEditing(category);
                        setName(category.name);
                        setDeleting(null);
                        setError("");
                        setMessage("");
                      }}
                      className="flex min-h-11 items-center gap-2 px-2 text-sm"
                    >
                      <Pencil size={15} />
                      Edit<span className="sr-only"> {category.name}</span>
                    </button>
                    <button
                      disabled={busy || usageUnknown || count > 0}
                      title={count > 0 ? "Move or delete assigned sarees first" : undefined}
                      onClick={() => {
                        setDeleting(category);
                        setError("");
                        setMessage("");
                      }}
                      className="flex min-h-11 items-center gap-2 px-2 text-sm text-red-700 disabled:opacity-40"
                    >
                      <Trash2 size={15} />
                      Delete<span className="sr-only"> {category.name}</span>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          {!categories.length && (
            <p className="mt-4 text-sm text-muted-foreground">
              No categories yet. Create one to start adding sarees.
            </p>
          )}
        </>
      )}
      {deleting && (
        <div role="alert" className="mt-5 rounded-md border border-red-200 bg-red-50 p-4">
          <p>
            Delete <strong>{deleting.name}</strong>? This cannot be undone.
          </p>
          <div className="mt-3 flex gap-5">
            <button
              disabled={busy}
              onClick={() => {
                void remove();
              }}
              className="min-h-11 text-sm font-medium text-red-700"
            >
              {busy ? "Deleting…" : "Confirm delete"}
            </button>
            <button disabled={busy} onClick={() => setDeleting(null)} className="min-h-11 text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}
      {error && (
        <p role="alert" className="mt-4 text-sm text-red-700">
          {error}
        </p>
      )}
      {message && (
        <p role="status" className="mt-4 text-sm text-green-800">
          {message}
        </p>
      )}
    </section>
  );
}
