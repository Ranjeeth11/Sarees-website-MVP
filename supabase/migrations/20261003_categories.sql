-- Existing projects: run this ONCE instead of rerunning schema.sql.
-- All changes are transactional, preserving existing sarees and their categories.
begin;
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
insert into public.categories (name)
select category from public.products
union select unnest(array['Silk', 'Cotton', 'Party Wear', 'Daily Wear']);
alter table public.products drop constraint products_category_check;
alter table public.products add constraint products_category_fkey
  foreign key (category) references public.categories(name) on update cascade on delete restrict;
commit;
