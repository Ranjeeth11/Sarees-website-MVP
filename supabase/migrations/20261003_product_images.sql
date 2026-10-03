-- Run once after the original schema and category migration.
begin;
create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_path text not null,
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now()
);
alter table public.product_images enable row level security;
create policy "Public product images" on public.product_images for select to anon, authenticated using (true);
create policy "Admins manage product images" on public.product_images for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
insert into public.product_images (product_id, image_path, sort_order)
select id, image_path, 0 from public.products;
commit;
