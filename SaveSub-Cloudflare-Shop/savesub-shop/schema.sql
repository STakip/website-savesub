CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'customer', created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL, expires_at INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY, user_id TEXT NOT NULL, product_id TEXT NOT NULL,
  price INTEGER NOT NULL, status TEXT NOT NULL DEFAULT 'Pending',
  created_at TEXT NOT NULL, FOREIGN KEY(user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY, order_id TEXT NOT NULL, sender_id TEXT NOT NULL,
  sender_role TEXT NOT NULL, body TEXT NOT NULL, created_at TEXT NOT NULL,
  FOREIGN KEY(order_id) REFERENCES orders(id)
);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_order ON messages(order_id, created_at);