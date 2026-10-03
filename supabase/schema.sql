-- Run once in the Supabase SQL Editor.
create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.admin_users enable row level security;
create policy "Admins can see their own membership" on public.admin_users
  for select to authenticated using (user_id = (select auth.uid()));

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique check (name = trim(name) and length(name) between 1 and 80)
);
create unique index categories_name_case_insensitive on public.categories (lower(name));
alter table public.categories enable row level security;
create policy "Public categories" on public.categories for select to anon, authenticated using (true);
create policy "Admins manage categories" on public.categories for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
insert into public.categories (name) values ('Silk'), ('Cotton'), ('Party Wear'), ('Daily Wear');

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) between 1 and 160),
  description text not null check (length(trim(description)) between 1 and 5000),
  category text not null references public.categories(name) on update cascade on delete restrict,
  fabric text not null check (length(trim(fabric)) between 1 and 160),
  color text not null check (length(trim(color)) between 1 and 160),
  price numeric(10,2) not null check (price >= 0),
  image_path text not null,
  available boolean not null default true,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.products enable row level security;
create policy "Public catalogue" on public.products for select to anon, authenticated using (true);
create policy "Admins manage products" on public.products for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('saree-images', 'saree-images', true, 5242880, array['image/jpeg','image/png','image/webp']);
create policy "Admins upload saree photos" on storage.objects for insert to authenticated
  with check (bucket_id = 'saree-images' and exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy "Admins inspect saree photos" on storage.objects for select to authenticated
  using (bucket_id = 'saree-images' and exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy "Admins delete saree photos" on storage.objects for delete to authenticated
  using (bucket_id = 'saree-images' and exists (select 1 from public.admin_users where user_id = (select auth.uid())));

-- Create your user under Authentication > Users, then run:
-- insert into public.admin_users (user_id) values ('YOUR_AUTH_USER_UUID');
-- Admin membership can only be granted through the SQL Editor / trusted backend.
