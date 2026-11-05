SAVESUB SHOP — CLOUDFLARE PAGES + D1

Included:
- English storefront with animated dark design
- Products and prices: OnePlay Account $3, Random Account $4, MLWR $5, RMT $6
- Customer registration/login
- Private order chat between each customer and shop admin
- Admin dashboard showing all customer orders and their chats
- Empty product image placeholders in assets/products/

IMPORTANT:
A private chat and user accounts need a database and server functions. Uploading static HTML alone is not enough. This project is prepared for Cloudflare Pages + D1; follow the one-time setup below.

1) Create a D1 database:
   npx wrangler d1 create savesub-db

2) Copy the database_id returned by Cloudflare into wrangler.toml, replacing:
   REPLACE_WITH_YOUR_D1_DATABASE_ID

3) Create the tables:
   npx wrangler d1 execute savesub-db --remote --file=schema.sql

4) Set admin credentials as Cloudflare Pages environment variables:
   ADMIN_EMAIL = your admin email
   ADMIN_PASSWORD = a strong unique password (at least 8 characters)
   In Cloudflare Dashboard: Workers & Pages > your Pages project > Settings > Variables and Secrets.
   Mark ADMIN_PASSWORD as a secret. Do not put your admin password in any website file.

5) Deploy:
   - In Cloudflare Dashboard, create a Pages project and connect/upload this project.
   - Set the project build output directory to "." (or use Wrangler deployment).
   - Add the D1 binding named DB, connected to savesub-db:
     Settings > Functions > D1 database bindings > Variable name DB.
   - Redeploy after adding the binding and variables.

   CLI alternative:
   npx wrangler pages deploy . --project-name=savesub-shop

6) Open your site and log in using ADMIN_EMAIL and ADMIN_PASSWORD.
   The admin user is created automatically on the first successful admin login.
   Customers create their own accounts and click Buy now. Each order has a private chat.

ADDING PRODUCT IMAGES:
Put your image files in assets/products/ and edit the product card markup in app.js
(or replace the placeholder panels in index.html/app.js with <img> elements).
Placeholder files are provided in assets/products to show the intended filenames.

NOTES:
- Payments are arranged manually in the private chat. No card payment gateway is included.
- The site does not store or deliver account credentials automatically.
- Keep ADMIN_PASSWORD secret. Use HTTPS (Cloudflare Pages provides it).
- This is a starter implementation. Before taking real payments or storing sensitive customer data, have the deployment and security reviewed.
