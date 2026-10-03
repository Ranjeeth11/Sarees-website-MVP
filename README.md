# Pixel Perfect Preview

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bd9d903d-dca3-4af1-86ab-c19055251984).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Saree admin (Supabase)

Open `/admin` to sign in and add, edit or delete sarees. Fields include a photo,
name, description, price in INR, category, fabric, colour, availability and featured
status. Featured sarees appear on the homepage; all sarees appear in Collections.

### Connect your project

1. Create a Supabase project and run `supabase/schema.sql` in its SQL Editor.
2. Under Authentication > Users, create your admin user with an email/password.
   Copy the user's UUID and run:
   `insert into public.admin_users (user_id) values ('YOUR_AUTH_USER_UUID');`
3. Copy `.env.example` to `.env` and set the project URL and publishable key from
   Supabase's Connect/API settings. Only the public publishable key belongs here;
   never put a service-role or secret key in a `VITE_` variable.
4. Restart `npm run dev`, open `/admin`, and sign in with that admin account.
5. Add the same environment variables to your hosting provider before deploying.

The database and storage policies restrict changes to explicitly granted admins.
There is no public sign-up page. Images are public so customers can see them;
JPG, PNG and WebP uploads are limited to 5 MB. Product deletion also removes its
photo; a cleanup failure is reported and can be resolved in Supabase Storage.

Without environment variables, the existing sample catalogue remains visible and
admin shows a setup message. Once connected, the store uses the Supabase catalogue
(including an empty state until you add products), replacing sample products.
The local `saree-images` folder is preserved; select those files in the upload form.

### Category management

The `/admin` page also creates, edits and deletes categories. Product forms,
collection filters and homepage tiles use this shared list. Renaming a category
updates its assigned sarees automatically. Categories containing sarees cannot be
deleted: edit those sarees to select another category, or delete them first.
Category names must be unique (case insensitive), with 1–80 characters.

For a **new Supabase project**, use the updated `supabase/schema.sql`.
If you **already ran the previous schema**, run
`supabase/migrations/20261003_categories.sql` once in the SQL Editor instead.
It preserves existing products and seeds the current categories. Deploy the updated
app after running the migration. Category mutations require the same admin membership
as product mutations.

### Multiple product photos

Each saree can have up to eight photos. Select multiple files in the admin form;
the first file becomes the main image and the rest appear as a gallery on the
product page. If the original schema is already installed, run+`supabase/migrations/20261003_product_images.sql` once before using multi-photo+uploads. The migration keeps existing product images.
